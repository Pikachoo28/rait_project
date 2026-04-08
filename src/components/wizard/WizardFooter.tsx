import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

interface WizardFooterProps {
  canGoBack: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onActivate: () => void;
}

export const WizardFooter = ({
  canGoBack,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
  onActivate
}: WizardFooterProps) => (
  <div className="flex flex-col gap-3 border-t border-border/20 pt-6 lg:flex-row lg:items-center lg:justify-between">
    <button
      type="button"
      onClick={onBack}
      disabled={!canGoBack}
      className="inline-flex items-center justify-center rounded-full border border-border/25 bg-surfaceAlt px-5 py-3 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-45 dark:hover:text-sky-300"
    >
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      Back
    </button>

    {isLastStep ? (
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSaveDraft}
          className="inline-flex items-center justify-center rounded-full border border-border/25 bg-surfaceAlt px-5 py-3 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
        >
          Save as draft
        </button>
        <button
          type="button"
          onClick={onActivate}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Activate metric
        </button>
      </div>
    ) : (
      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
      >
        Continue
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </button>
    )}
  </div>
);
