// Fixed ambient-glow layer behind everything (design.md §2). The glow tokens
// are transparent in light mode, so this self-disables there - no JS branch.
export function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(60% 55% at 12% -5%, var(--glowA), transparent 70%), radial-gradient(55% 50% at 92% 0%, var(--glowB), transparent 70%)",
      }}
    />
  );
}
