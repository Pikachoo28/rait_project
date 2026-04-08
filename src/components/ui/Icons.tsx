interface IconProps {
  className?: string;
}

export const ArrowLeftIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.5 3.5 2 8l4.5 4.5" />
    <path d="M2.5 8h11" />
  </svg>
);

export const ArrowRightIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 3.5 14 8l-4.5 4.5" />
    <path d="M13.5 8h-11" />
  </svg>
);

export const PlusIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3v10" />
    <path d="M3 8h10" />
  </svg>
);

export const SunIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.5v2" />
    <path d="M8 12.5v2" />
    <path d="M1.5 8h2" />
    <path d="M12.5 8h2" />
    <path d="M3.4 3.4 4.8 4.8" />
    <path d="M11.2 11.2 12.6 12.6" />
    <path d="M11.2 4.8 12.6 3.4" />
    <path d="M3.4 12.6 4.8 11.2" />
  </svg>
);

export const MoonIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.9 1.9a5.9 5.9 0 1 0 3.2 10.8A6.4 6.4 0 0 1 10.9 1.9Z" />
  </svg>
);

export const CheckIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3.5 8.5 3 3L12.8 5.2" />
  </svg>
);

export const TrendUpIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 11.5 7.2 7.3l2.4 2.4L13 6.3" />
    <path d="M9.8 6.3H13v3.2" />
  </svg>
);

export const TrendDownIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 4.5 7.2 8.7l2.4-2.4L13 9.7" />
    <path d="M9.8 9.7H13V6.5" />
  </svg>
);

export const PulseIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.5 8h3l1.6-3 2.8 6 1.8-4H14.5" />
  </svg>
);

export const LayersIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m8 2 5.8 3L8 8 2.2 5 8 2Z" />
    <path d="m2.2 8 5.8 3 5.8-3" />
    <path d="m2.2 11 5.8 3 5.8-3" />
  </svg>
);
