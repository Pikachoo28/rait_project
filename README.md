# RAIT Metrics

RAIT Metrics is a Next.js 14 frontend prototype for configuring and managing Responsible AI metrics. The app centers on a multi-step metric wizard, a filterable metrics library, and metric detail and edit views.

## Implemented Features

- Metrics library with search, category filter, and status filter
- Metric creation flow in a four-step wizard
- Metric detail screen with inline status changes
- Editing flow that loads existing metric values back into the wizard
- Browser persistence for metrics and theme preferences
- Route-level loading UI for suspended navigations
- Light and dark theme toggle with persisted preference

## Routes

- `/` redirects to `/metrics`
- `/metrics` shows the metrics library
- `/metrics/new` opens the create wizard
- `/metrics/[metricId]` shows a metric detail page
- `/metrics/[metricId]/edit` opens the edit wizard for an existing metric

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS

## State And Persistence

- Metrics are seeded from bundled mock data in `src/data/mockMetrics.ts`
- After hydration, metrics are stored in `localStorage` under `rait-metrics-store`
- Theme preference is stored in `localStorage` under `rait-theme`
- Success messages after create and edit actions are passed through `sessionStorage`

## Wizard Structure

The wizard is split into four steps:

1. Basic details
2. Measurement config
3. Alerts and ownership
4. Review and confirm

Validation blocks forward navigation when required fields are incomplete or invalid. Final save actions validate the full form before writing to the client-side store.

## Metric Model

Each metric contains:

- `id`, `status`, `createdAt`, and `updatedAt`
- Basic details: name, category, description, and applicable AI system types
- Measurement config: data source, cadence, threshold direction, minimum value, target value, and unit
- Alerts and ownership: owner, alert recipients, alert conditions, and escalation policy

New metric IDs are generated from the metric name plus a random suffix to avoid collisions.

## Project Structure

```text
src/
  app/                  Routes, layout, global styles, loading boundary
  components/
    metrics/            Library, cards, detail, filters, status controls
    ui/                 Shared field primitives and layout pieces
    wizard/             Wizard shell, footer, header, and step screens
  context/              Metrics and theme providers
  data/                 Seed metrics and empty form defaults
  hooks/                Wizard and library filter hooks
  lib/                  Metric helpers and form validation
  state/                Wizard reducer and step definitions
  types/                Shared metric and filter types
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Accessibility And UX Notes

- Required fields are marked with `*`
- Validation errors are surfaced at the field level
- Custom radio, chip, and status controls use semantic form grouping
- Reduced-motion preferences are respected globally
- Route transitions render a dedicated loading screen when the next view suspends

## Current Scope

This repository currently implements a frontend-only prototype:

- No backend or database
- No authentication
- No server-side persistence
- No automated tests configured in the project

For a production version, the main next step would be replacing local browser persistence with an API-backed data layer.
