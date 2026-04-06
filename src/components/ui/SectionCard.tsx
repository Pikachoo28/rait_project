import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const SectionCard = ({
  title,
  description,
  children,
  className = ""
}: SectionCardProps) => (
  <section
    className={`rounded-4xl border border-border/40 bg-surface/90 p-6 shadow-panel ${className}`}
  >
    {(title || description) && (
      <div className="mb-6">
        {title ? <h2 className="text-xl font-semibold tracking-tight">{title}</h2> : null}
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-ink/70">{description}</p>
        ) : null}
      </div>
    )}
    {children}
  </section>
);
