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
    <SectionCard
      title="Step 3: Alerts and Ownership"
      description="Attach an owner, define who should be notified, and specify how the system should escalate metric risk."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          label="Metric owner"
          required
          placeholder="Sarah Chen"
          value={values.owner}
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
        <div className="md:col-span-2">
          <TagInput
            label="Alert recipients"
            required
            values={values.alertRecipients}
            error={errors.alertRecipients}
            onChange={(nextValues) => onChange("alertRecipients", nextValues)}
          />
        </div>
        <div className="md:col-span-2">
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-ink">
              Alert conditions
              <span className="ml-1 text-danger">*</span>
            </legend>
            <div className="grid gap-3 md:grid-cols-2">
              {alertConditions.map((condition) => {
                const checked = values.alertConditions.includes(condition);

                return (
                  <label
                    key={condition}
                    className="flex items-start gap-3 rounded-2xl border border-border/40 bg-surface px-4 py-3 text-sm text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCondition(condition)}
                      className="mt-1 h-4 w-4 rounded border-border/60 text-accent focus:ring-accent"
                    />
                    <span>{condition}</span>
                  </label>
                );
              })}
            </div>
            {errors.alertConditions ? (
              <span className="mt-2 block text-sm text-danger">{errors.alertConditions}</span>
            ) : null}
          </fieldset>
        </div>
      </div>
    </SectionCard>
  );
};
