# DataWatch Frontend (Change Tracking SaaS)

## Problem

for users and businesses who need to monitor changes on web pages / websites ,such as price drops, stock availability, policy updates, or competitor movements. Manually checking these sites is tedious.

## Solution

DataWatch provides a user-friendly / nocode interface for scheduling and monitoring web scrapers. Users can track specific data points on any website, view execution histories, and instantly see visual diffs of what changed between scrapes.

## Key Features

- **Dashboard & Job Management**: Create, edit, and manage scraping jobs.
- **Visual Diff Viewer**: See exactly what changed in the extracted data using a built-in diff viewer.
- **Real-Time Updates**: Instant notifications and status updates via email or inapp when a scrape succeeds or fails, or finds a difference.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4), [Radix UI](https://www.radix-ui.com/)
- **State Management & Fetching**: [TanStack Query](https://tanstack.com/query)
- **Tables**: [TanStack Table](https://tanstack.com/table)
- **Forms & Validation**: React Hook Form, Zod
- **Real-time**: Socket.IO Client
- **Diffing**: React Diff Viewer Continued

## Quickstart

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file in the root of the project (see the .env.example file):

```env
# Example Env Vars
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## Deployment

This Next.js app can be easily deployed to Vercel, Netlify, or your own Node.js server using:

```bash
npm run build
npm run start
```

## Roadmap

- [ ] Implement team workspaces.
- [ ] Add visual/screenshot diffing directly in the UI.
- [ ] Build a browser extension to quickly add jobs from any webpage.
- [ ] Add Webhook integration configurations in the dashboard.
