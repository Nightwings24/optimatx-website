"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { allRoutes } from "@/lib/nav";
import { useCommandPalette } from "./CommandPalette";
import { useFocusTrap } from "./useFocusTrap";
import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";

// Mobile navigation drawer (design.md §9) - shown under ~840px. Esc/backdrop
// close, background scroll locked, focus trapped + restored (see below).
// Lists every route (Home is the logo, Join is the button) so nothing on the
// site is unreachable on mobile.
const drawerLinks = allRoutes.filter(
  (r) => r.href !== "/" && r.href !== "/join"
);

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { open: openPalette } = useCommandPalette();

  useEffect(() => setMounted(true), []);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-btn border-[1.5px] border-line2 text-ink transition-colors hover:border-accent hover:text-accent min-[840px]:hidden"
      >
        <span className="text-lg leading-none">☰</span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] min-[840px]:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
          <button
            aria-label="Close menu"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col gap-1 border-l border-line2 bg-surface p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-xl leading-none text-ink2 hover:text-ink"
              >
                ✕
              </button>
            </div>

            {drawerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] text-ink2 transition-colors hover:bg-bg2 hover:text-accent"
              >
                {l.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openPalette();
              }}
              className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[15px] text-ink3 transition-colors hover:bg-bg2 hover:text-ink2"
            >
              <span aria-hidden>⌕</span> Search
              <Kbd className="ml-auto">⌘K</Kbd>
            </button>

            <Button href="/join" className="mt-auto w-full" onClick={() => setOpen(false)}>
              Join OptimatX
            </Button>
          </div>
          </div>,
          document.body
        )}
    </>
  );
}
