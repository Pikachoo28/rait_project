import { WizardStepDefinition } from "@/types/metric";

import { Stepper } from "./Stepper";

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
  <div className="space-y-6 rounded-[2.25rem] border border-border/20 bg-surface/90 p-6 shadow-panel">
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
        Guided metric setup
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Build a metric that reads like a dashboard, not a form.
      </h1>
      <p className="mt-3 text-sm leading-6 text-ink/68">
        Move through the four steps to define the metric, shape its threshold behavior, assign the
        right owners, and review the final dashboard preview before saving.
      </p>
    </div>

    <Stepper
      steps={steps}
      currentStepIndex={currentStepIndex}
      canSelectStep={canSelectStep}
      onStepSelect={onStepSelect}
    />
  </div>
);
