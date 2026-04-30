# Dev Notes (change-tracking-saas / frontend)

Quick, honest notes for me + future maintainers. Update freely.

## Where is the code for X?

- App routes: `app/**`
- Dashboard pages: `app/dashboard/**`
- Auth pages: `app/(auth)/**`
- Create job flow: `app/dashboard/jobs/create-job/page.tsx`, `components/dashboard/create-job/**`, `services/jobs.service.ts`
- Manual run button: `components/dashboard/job-detail/JobDetailHeader.tsx`
- Runs pages: `app/dashboard/jobs/[id]/runs/page.tsx`, `app/dashboard/jobs/[id]/runs/[executionId]/page.tsx`
- Runs UI: `components/runs/**`
- API client: `lib/api-client.ts`
- Notifications socket: `hooks/useNotificationsSocket.ts`
- Preview + element picker: `hooks/useDatapointPreview.ts`, `hooks/useElementPicker.ts`, `components/dashboard/create-job/element-picker/**`

## What happens when a monitor runs?

- In UI, a "monitor" is just a Job run.
- Click Run -> `POST /jobs/:id/run` from `components/dashboard/job-detail/JobDetailHeader.tsx`.
- UI polls executions with `services/executions.service.ts` (`/jobs/:id/executions` and `/jobs/:id/executions/latest`).
- Runs list + detail render in `app/dashboard/jobs/[id]/runs/**` using `components/runs/**`.
- Notifications arrive over websocket via `hooks/useNotificationsSocket.ts`.

## How do I run the system locally?

- Install: `npm install`
- Env: create `.env.local` based on `.env.example`
- Start: `npm run dev`
- Frontend URL: `http://localhost:3000`

Backend must also be running. (check the other repo for the backend)

## Where are env vars set?

- Template: `.env.example`
- Local: `.env.local` (ignored by git; see `.gitignore`)

Main var:

- `NEXT_PUBLIC_API_URL`
  - Used by `lib/api-client.ts`
  - Used by server-side fetch in `app/dashboard/layout.tsx`
  - Used by preview fetch in `hooks/useDatapointPreview.ts`
  - Used by social auth redirect in `services/auth.service.ts`

## How do I debug a failed scrape? (frontend POV)

- Go to runs list: `/dashboard/jobs/:id/runs` (`app/dashboard/jobs/[id]/runs/page.tsx`).
- Run detail shows backend logs: `/dashboard/jobs/:id/runs/:executionId` (`components/runs/single-run-page/ExecutionLogs.tsx`).
- Check network calls for `/jobs/:id/run`, `/jobs/:id/executions`, `/jobs/:id/executions/:executionId`.
- Preview/picker issues: `hooks/useDatapointPreview.ts` calls `/preview`; it uses `localStorage.accessToken` (set in `services/auth.service.ts`).
