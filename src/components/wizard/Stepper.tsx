import { WizardStepDefinition } from "@/types/metric";

import { CheckIcon } from "@/components/ui/Icons";

interface StepperProps {
  steps: WizardStepDefinition[];
  currentStepIndex: number;
  canSelectStep: (index: number) => boolean;
  onStepSelect: (index: number) => void;
}

const stepLabels: Record<WizardStepDefinition["id"], string> = {
  "basic-details": "Basic",
  "measurement-config": "Measurement",
  "alerts-ownership": "Alerts",
  "review-confirm": "Review"
};

export const Stepper = ({
  steps,
  currentStepIndex,
  canSelectStep,
  onStepSelect
}: StepperProps) => (
  <div className="grid gap-4 md:grid-cols-4">
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
          className={`group relative overflow-hidden rounded-[1.75rem] border px-4 py-4 text-left transition duration-300 ${
            isActive
              ? "border-sky-500/40 bg-sky-500/12 shadow-[0_18px_40px_rgba(14,165,233,0.12)]"
              : isComplete
                ? "border-emerald-500/25 bg-emerald-500/10"
                : "border-border/25 bg-surface/80"
          } ${isSelectable ? "hover:-translate-y-0.5 hover:border-sky-500/35" : "cursor-not-allowed opacity-60"}`}
        >
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={`absolute right-[-18%] top-1/2 hidden h-px w-[36%] -translate-y-1/2 md:block ${
                index < currentStepIndex ? "bg-emerald-500/70" : "bg-border/25"
              }`}
            />
          ) : null}

          <div className="flex items-start gap-3">
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold ${
                isComplete
                  ? "border-emerald-500/25 bg-emerald-500 text-white"
                  : isActive
                    ? "border-sky-500/30 bg-sky-500 text-white"
                    : "border-border/25 bg-surfaceAlt/80 text-ink/55"
              }`}
            >
              {isComplete ? <CheckIcon className="h-4 w-4" /> : `0${index + 1}`}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                Step {index + 1}
              </p>
              <p className="mt-1 text-base font-semibold text-ink">{stepLabels[step.id]}</p>
              <p className="mt-1 text-sm leading-5 text-ink/60">{step.description}</p>
            </div>
          </div>
        </button>
      );
    })}
  </div>
);

