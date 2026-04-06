export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite" aria-busy="true">
      <div className="w-full max-w-md rounded-[2rem] border border-border/40 bg-surface/90 px-8 py-10 text-center shadow-panel">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accentSoft">
          <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-accent/25 border-t-accent motion-reduce:animate-none" />
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-ink">Loading screen</h2>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Fetching the next view and preparing the page.
        </p>
        <span className="sr-only">Loading the next screen</span>
      </div>
    </div>
  );
}
