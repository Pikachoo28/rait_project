# Metric Configuration Wizard

## Suggested folder structure

```text
src/
  app/
    metrics/
      [metricId]/
        edit/
      new/
  components/
    metrics/
    ui/
    wizard/
      steps/
  context/
  data/
  hooks/
  lib/
    validation/
  state/
  types/
```

## TypeScript interfaces

The core domain model lives in `src/types/metric.ts`:

- `Metric` represents a configured Responsible AI metric in the library and detail screens.
- `MetricFormValues` isolates wizard input state from persisted status and timestamps.
- `BasicMetricDetails`, `MeasurementConfig`, and `AlertsOwnershipConfig` map one-to-one to the wizard steps.
- `MetricFormErrors` keeps validation output strongly typed by section and field.

## State management approach

The app uses React hooks only:

- `MetricsProvider` in `src/context/MetricsContext.tsx` holds the in-memory metrics store for create, edit, and status changes.
- `useMetricWizard` plus `metricWizardReducer` manage multi-step wizard input, navigation, and validation state.
- `useMetricFilters` keeps search and filter state local to the metrics library page.

## Component breakdown

- `components/metrics`: library cards, filters, status badge, detail summary, and status toggle.
- `components/wizard`: wizard shell, header, footer, threshold visualisation, edit wrapper, and per-step forms.
- `components/ui`: reusable field primitives, chip groups, radio groups, tag input, and section card container.

## Validation approach

Validation is implemented in `src/lib/validation/metricForm.ts`:

- Step-level validation blocks progression when required inputs are missing.
- Final validation runs before save-as-draft or activate actions.
- Email recipients are validated both in the tag input and the final form validator.
