# Frontend Dev Notes

Quick, honest notes for engineers. Update freely.

## Where Is The Code For X?

High-level map:
- App router pages: `app/**`
- Dashboard pages: `app/dashboard/**`
- Auth pages: `app/(auth)/**`
- UI building blocks: `components/ui/**`
- Dashboard components: `components/dashboard/**`
- API client (axios + auth interceptors): `lib/api-client.ts`
- API wrappers (services): `services/*.ts`
- Data hooks: `hooks/**`
- Types: `types/**`

Common features:
- Create job flow (target URL -> datapoint -> job): `app/dashboard/jobs/create-job/page.tsx`, `services/jobs.service.ts`
- Element picker: `components/dashboard/create-job/element-picker/**`, `hooks/useElementPicker.ts`
- Preview loader (calls backend `/preview`): `hooks/useDatapointPreview.ts`
- Run a job now (manual): `components/dashboard/job-detail/JobDetailHeader.tsx` (POSTs `/jobs/:id/run`)
- Executions UI: `app/dashboard/jobs/[id]/runs/**`, `services/executions.service.ts`
- Notifications: `components/dashboard/notifications/**`, `services/notifications.service.ts`, `hooks/useNotificationsSocket.ts`

## How Do I Run The System Locally?

From repo root:
- Install: `npm install`
- Env: `.env.local` (ignored) or see `.env.example` for required vars
- Dev server: `npm run dev`

Default URL: `http://localhost:3000`

## Where Are Env Vars Set?

Files:
- `.env.local` (ignored)
- `.env.example` (template, tracked)

Vars used in code:
- `NEXT_PUBLIC_API_URL`
- Used by `lib/api-client.ts`
- Used by server-side fetch in `app/dashboard/layout.tsx`
- Used by preview fetch in `hooks/useDatapointPreview.ts`
- Used by social auth redirect in `services/auth.service.ts`

## What Happens When A Monitor Runs?

Frontend view of a “monitor run”:
- A user action (or schedule) causes the backend to create a new execution record.
- The frontend renders execution status, logs, and results by polling the backend.

Manual run path:
- UI triggers: `components/dashboard/job-detail/JobDetailHeader.tsx`
- API call: `POST /jobs/:jobId/run`
- UI reads: `GET /jobs/:jobId/executions` and `GET /jobs/:jobId/executions/latest`

## Where Are Auth Tokens Stored?

There are two token stores:
- `localStorage.accessToken` (used by axios interceptor in `lib/api-client.ts`)
- Cookie `accessToken` (set in `services/auth.service.ts`, read by server components via `cookies()`)

If you see “works after login, breaks after refresh”, check whether the cookie is being set.

## How Do I Debug A Failed Scrape? (Frontend POV)

Start from the job runs pages:
- Runs list: `/dashboard/jobs/:id/runs`
- Run detail: `/dashboard/jobs/:id/runs/:executionId`

What to check:
- Network:
- `POST /jobs/:id/run` should 2xx quickly (it enqueues)
- `GET /jobs/:id/executions` should show a new execution and status changes
- `NEXT_PUBLIC_API_URL` points at the backend (usually `http://localhost:3001`)

Preview / element picker:
- Preview fetch: `hooks/useDatapointPreview.ts` calls `GET ${NEXT_PUBLIC_API_URL}/preview?...` with `Authorization: Bearer <token>`
- If preview 401s, check that `localStorage.accessToken` exists.

## Known Sharp Edges / Tech Debt

Route protection middleware is likely not wired:
- There is `proxy.ts` (looks like a Next middleware handler), but there is no `middleware.ts` using it.
- Actual protection currently relies on server components like `app/dashboard/layout.tsx` redirecting.

Socket URL default is suspicious:
- `hooks/useNotificationsSocket.ts` defaults to `http://localhost:3000` when env is missing.
- The websocket server is the backend Nest app, so local dev typically wants `http://localhost:3001`.

postMessage security:
- Element picker uses `postMessage(..., "*")` and listens for `message` without strict origin validation (`hooks/useElementPicker.ts`).
- Fine for internal/dev tooling, but a footgun if this ever runs in more hostile embedding contexts.

Iframe sandbox tradeoff:
- Picker iframe uses `sandbox="allow-scripts allow-same-origin"` (`components/dashboard/create-job/element-picker/ElementPickerBrowser.tsx`).
- This is required for the injected picker script to work, but be cautious about what the backend returns from `/preview`.
