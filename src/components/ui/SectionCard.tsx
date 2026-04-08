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
    className={`relative overflow-hidden rounded-[2rem] border border-border/25 bg-surface/90 p-6 shadow-panel backdrop-blur-sm ${className}`}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10" />
    {(title || description) && (
      <div className="relative mb-6">
        {title ? <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2> : null}
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-ink/70">{description}</p>
        ) : null}
      </div>
    )}
    <div className="relative">{children}</div>
  </section>
);
