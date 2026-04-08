import {
  alertConditions,
  escalationPolicies,
  MetricFormErrors,
  MetricFormValues
} from "@/types/metric";

import { InputField } from "@/components/ui/InputField";
import { SectionCard } from "@/components/ui/SectionCard";
import { SelectField } from "@/components/ui/SelectField";
import { TagInput } from "@/components/ui/TagInput";

interface AlertsOwnershipStepProps {
  values: MetricFormValues["alertsOwnership"];
  errors: MetricFormErrors["alertsOwnership"];
  onChange: <TField extends keyof MetricFormValues["alertsOwnership"]>(
    field: TField,
    value: MetricFormValues["alertsOwnership"][TField]
  ) => void;
}

export const AlertsOwnershipStep = ({
  values,
  errors,
  onChange
}: AlertsOwnershipStepProps) => {
  const toggleCondition = (condition: (typeof alertConditions)[number]) => {
    const nextConditions = values.alertConditions.includes(condition)
      ? values.alertConditions.filter((item) => item !== condition)
      : [...values.alertConditions, condition];

    onChange("alertConditions", nextConditions);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <SectionCard
          title="Ownership"
          description="Assign a clear owner and define how issues should escalate."
        >
          <div className="grid gap-5">
            <InputField
              label="Metric owner"
              required
              placeholder="Sarah Chen"
              value={values.owner}
              hint="Use the primary person responsible for responding to this metric."
              error={errors.owner}
              onChange={(event) => onChange("owner", event.target.value)}
            />
            <SelectField
              label="Escalation policy"
              required
              value={values.escalationPolicy}
              error={errors.escalationPolicy}
              onChange={(value) => onChange("escalationPolicy", value)}
              options={escalationPolicies.map((escalationPolicy) => ({
                label: escalationPolicy,
                value: escalationPolicy
              }))}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Recipients"
          description="List everyone who should receive operational alerts."
        >
          <TagInput
            label="Alert recipients"
            required
            values={values.alertRecipients}
            error={errors.alertRecipients}
            onChange={(nextValues) => onChange("alertRecipients", nextValues)}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Alert logic"
        description="Choose the events that should move this metric onto someone’s radar."
      >
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-ink">
            Alert conditions
            <span className="ml-1 text-danger">*</span>
          </legend>
          <div className="grid gap-3 md:grid-cols-2">
            {alertConditions.map((condition) => {
              const checked = values.alertConditions.includes(condition);

              return (
                <label
                  key={condition}
                  className={`flex items-start gap-3 rounded-[1.4rem] border px-4 py-4 text-sm transition ${
                    checked
                      ? "border-amber-500/25 bg-amber-500/10"
                      : "border-border/20 bg-surfaceAlt/75 hover:border-sky-500/25"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCondition(condition)}
                    className="mt-1 h-4 w-4 rounded border-border/60 text-sky-600 focus:ring-sky-500"
                  />
                  <div>
                    <p className="font-semibold text-ink">{condition}</p>
                    <p className="mt-1 text-xs leading-5 text-ink/55">
                      Include this event in the operational alert flow.
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
          {errors.alertConditions ? (
            <span className="mt-2 block text-sm text-danger">{errors.alertConditions}</span>
          ) : null}
        </fieldset>
      </SectionCard>
    </div>
  );
};
