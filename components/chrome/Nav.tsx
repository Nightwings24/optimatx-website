import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/nav";
import { SearchPill } from "./SearchPill";
import { ThemeToggle } from "./ThemeToggle";
import { NavDrawer } from "./NavDrawer";

// Sticky translucent top nav (design.md §6.1). Center links collapse into the
// mobile drawer under ~840px.
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-navbg backdrop-blur-[10px]">
      <div className="container-site flex h-[66px] items-center justify-between gap-4">
        <Link href="/" aria-label="OptimatX home" className="shrink-0">
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 min-[840px]:flex"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-ink2 transition-colors hover:bg-bg2 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SearchPill className="hidden min-[840px]:inline-flex" />
          <ThemeToggle />
          <Button
            href="/join"
            className="hidden px-4 py-2 text-[14px] min-[840px]:inline-flex"
          >
            Join
          </Button>
          <NavDrawer />
        </div>
      </div>
    </header>
  );
}
