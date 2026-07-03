// The signature "Math" highlight chip (design.md §6.2c): filled green box,
// white text, a bold ink outline. Use for at most one key word per view.
export function MathChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[13px] border-2 border-ink bg-accent px-[0.35em] pb-[0.06em] text-white">
      {children}
    </span>
  );
}
