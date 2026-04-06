import { WizardStepDefinition } from "@/types/metric";

interface WizardHeaderProps {
  steps: WizardStepDefinition[];
  currentStepIndex: number;
  canSelectStep: (index: number) => boolean;
  onStepSelect: (index: number) => void;
}

export const WizardHeader = ({
  steps,
  currentStepIndex,
  canSelectStep,
  onStepSelect
}: WizardHeaderProps) => (
  <div className="space-y-6 rounded-4xl border border-border/40 bg-surface/90 p-6 shadow-panel">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/50">
        Metric Setup Wizard
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        Configure a metric in four steps
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-ink/70">
        The reducer-driven wizard keeps the flow deterministic while validation happens at step
        boundaries and on final submit.
      </p>
    </div>

    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex;
        const isComplete = index < currentStepIndex;
        const isSelectable = canSelectStep(index);

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepSelect(index)}
            disabled={!isSelectable}
            aria-current={isActive ? "step" : undefined}
            aria-disabled={!isSelectable}
            className={`rounded-3xl border px-4 py-4 text-left transition ${
              isActive
                ? "border-accent bg-accent text-canvas"
                : isComplete
                  ? "border-accent/30 bg-accentSoft text-ink"
                  : "border-border/40 bg-surface text-ink"
            } ${!isSelectable ? "cursor-not-allowed opacity-60" : ""}`}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em]">
              Step {index + 1}
            </div>
            <div className="mt-2 text-base font-semibold">{step.title}</div>
            <div className={`mt-1 text-sm ${isActive ? "text-canvas/85" : "text-ink/60"}`}>
              {step.description}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);
