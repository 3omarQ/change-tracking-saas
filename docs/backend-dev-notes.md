# Backend Dev Notes

Quick, honest notes for engineers. Update freely.

## Where Is The Code For X?

This repo is frontend-only. Backend lives in `datawatch-backend` (separate repo).

Paths in this doc are written relative to the backend repo root.

High-level:
- App boot: `src/main.ts`, `src/app.module.ts`
- Prisma DB: `src/prisma/**`, schema: `prisma/schema.prisma`
- Auth (JWT, email verification, password reset): `src/auth/**`
- CRUD:
- Target URLs: `src/target-urls/**`
- Datapoints (selector + field names + pagination config): `src/datapoints/**`
- Jobs: `src/jobs/**`
- Executions: `src/job-executions/**`
- Logs: `src/job-logs/**`
- Results: `src/results/**`

Scraping and scheduling:
- Queue (BullMQ): `src/queue/**`
- Worker: `src/queue/scrape.processor.ts`
- Scheduler: `src/jobs/job-scheduler.service.ts`
- Scrapers:
- BASIC (axios + cheerio): `src/scraper/strategies/basic.scraper.ts`
- SMART (puppeteer): `src/scraper/strategies/smart.scraper.ts`
- Output formatting: `src/scraper/formatters/*` and `src/scraper/formatter-factory.service.ts`

Element picker preview:
- Endpoint: `src/preview/preview.controller.ts` (`GET /preview`)
- Puppeteer + HTML sanitization + injected scripts: `src/preview/preview.service.ts`

Notifications:
- Execution lifecycle events: `src/events/*`
- Notification fanout: `src/notifications/notifications.service.ts`
- Websocket gateway: `src/notifications/gateways/notifications.gateway.ts`
- Webhook channel: `src/notifications/channels/webhook.channel.ts`
- Email sender (SMTP): `src/auth/email.service.ts`

## How Do I Run The System Locally?

There is no `docker-compose.yml` in this repo today. You need:
- Postgres (for Prisma)
- Redis (for BullMQ)

From `datawatch-backend` repo (this frontend repo does not contain backend code):
- Install: `npm install`
- Env: `.env` (ignored) or see `.env.example` for required vars
- Prisma generate: `npx prisma generate`
- Migrate: `npx prisma migrate dev`
- Run dev server: `npm run start:dev`
- Debug server: `npm run start:debug`

Defaults:
- Backend listens on `PORT` or `3001` (`src/main.ts`)
- CORS `origin` is `FRONTEND_URL` or `http://localhost:3000` (`src/main.ts`)

## Where Are Env Vars Set?

Nest env loading:
- `ConfigModule.forRoot({ isGlobal: true })` in `src/app.module.ts`

Env access patterns:
- Some code uses `ConfigService` (`src/auth/*`, `src/auth/email.service.ts`)
- Some code reads `process.env` directly (`src/main.ts`, `src/app.module.ts`, `src/prisma/prisma.service.ts`)

Template:
- `.env.example`

Note: `.gitignore` should ignore real `.env` files but allow `.env.example`.

## What Happens When A Monitor Runs?

In this codebase the “monitor” is a Job run, which produces:
- A `JobExecution` record
- `Log` rows (INFO/ERROR)
- A `Result` row containing `{ text: <formatted string> }`
- Optional notifications when done/failed/diff

Manual run request:
1. API call: `POST /jobs/:id/run`
1. Controller: `src/job-executions/job-executions.controller.ts`
1. Enqueue: `JobSchedulerService.enqueueRun()` in `src/jobs/job-scheduler.service.ts`

Queue + worker:
1. Queue name and job name are both `scrape`: `src/queue/constants.ts`
1. Worker is `src/queue/scrape.processor.ts`
1. Worker flow:
- `JobExecutionsService.initExecution()` creates or marks an execution RUNNING
- `JobExecutionsService.fetchJobTarget()` loads URL, selector, pagination config, extractor type, output format
- `ScraperFactoryService.get()` picks BASIC or SMART (`src/scraper/scraper-factory.service.ts`)
- `FormatterFactoryService.get()` picks TXT/JSON/MD/CSV and injects field names (`src/scraper/formatter-factory.service.ts`)
- Scrape happens, formatter produces a string, then `completeExecution()` persists

Persist + diff + events:
- `completeExecution()` in `src/job-executions/job-executions.service.ts`:
- Saves result and an INFO log
- Marks execution DONE
- Compares latest two DONE executions and emits `execution.diff` if changed
- Emits `execution.done` every time
- `failExecution()` saves an ERROR log, marks FAILED, emits `execution.failed`

Notifications:
- `src/notifications/notifications.service.ts` listens for `execution.done`, `execution.failed`, `execution.diff`
- It can push websocket notifications, send webhooks, and email users.

Scheduled runs:
- On job create: `JobsService.create()` calls `scheduleOnCreate()` (`src/jobs/jobs.service.ts`)
- Cron schedules use `Queue.upsertJobScheduler(...)` (`src/jobs/job-scheduler.service.ts`)
- One-off future schedules use a delayed `Queue.add(..., { delay })`

## How Do I Debug A Failed Scrape?

Start by fetching the execution and its logs:
- API: `GET /jobs/:id/executions` and `GET /jobs/:id/executions/:executionId`
- Controller: `src/job-executions/job-executions.controller.ts`
- Logs are written by `src/job-executions/job-executions.service.ts`

Common failure buckets:
- Selector issues:
- BASIC throws “No elements found…” / “all were empty” in `src/scraper/strategies/basic.scraper.ts`
- SMART can time out waiting for selector in `src/scraper/strategies/smart.scraper.ts`
- Bot defenses / JS-heavy pages:
- Switch extractor to SMART (puppeteer) for pages that require rendering
- Pagination issues:
- BASIC only follows `href` via the pagination selector
- SMART tries user selector first, then fallbacks like `a[rel="next"]`

Preview / element picker debugging:
- Endpoint: `GET /preview?url=...&selector=...` (`src/preview/preview.controller.ts`)
- Implementation uses puppeteer to fetch DOM content and then sanitizes HTML (`src/preview/preview.service.ts`)

## Known Sharp Edges / Tech Debt

OAuth is not fully wired:
- Google/GitHub strategies exist (`src/auth/strategies/*.strategy.ts`)
- `AuthController` does not currently expose `/auth/google` or `/auth/github` redirect/callback routes (`src/auth/auth.controller.ts`)

Worker debug logs:
- `src/queue/scrape.processor.ts` contains `console.log` statements in the hot path.

Field name parsing is unguarded:
- `JSON.parse(job.datapoint.fieldNames)` is used without try/catch (`src/job-executions/job-executions.service.ts`).

Queue module wiring:
- `QueueModule` provides `JobExecutionsService` directly (`src/queue/queue.module.ts`) even though it also exists in `JobExecutionsModule`.

Websocket gateway CORS:
- `@WebSocketGateway({ cors: { origin: '*' } })` is wide open (`src/notifications/gateways/notifications.gateway.ts`).

Webhook retry behavior:
- Retries are immediate and recursive without backoff (`src/notifications/channels/webhook.channel.ts`).
