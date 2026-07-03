// Keyboard skip link - visually hidden until focused (design.md §9).
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-btn focus:bg-accent-fill focus:px-4 focus:py-2 focus:font-bold focus:text-white"
    >
      Skip to content
    </a>
  );
}
