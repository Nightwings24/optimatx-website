"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { paletteCommands, type CommandItem } from "@/lib/nav";
import { Kbd } from "@/components/ui/Kbd";

// ⌘K command palette (design.md §6.10). The provider holds the open state,
// wires the global ⌘/Ctrl+K + Esc keys, locks scroll, and renders the dialog.
// The nav SearchPill opens it via useCommandPalette().

interface PaletteApi {
  open: () => void;
  close: () => void;
}
const Ctx = createContext<PaletteApi | null>(null);

export function useCommandPalette(): PaletteApi {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  }
  return ctx;
}

export function CommandPaletteProvider({
  children,
  extraCommands = [],
}: {
  children: React.ReactNode;
  // Content items (problems, blog posts) indexed at build time so the palette
  // searches actual content, not just top-level routes.
  extraCommands?: CommandItem[];
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const triggerRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);

  useEffect(() => setMounted(true), []);

  // Capture the trigger before opening (cmdk autofocuses the input, so we can't
  // read it later) and restore focus to it on close.
  const openPalette = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const closePalette = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus?.();
  }, []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) closePalette();
        else openPalette();
      } else if (e.key === "Escape") {
        closePalette();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openPalette, closePalette]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const api: PaletteApi = { open: openPalette, close: closePalette };
  const commands = extraCommands.length
    ? [...paletteCommands, ...extraCommands]
    : paletteCommands;

  function run(fn: () => void) {
    closePalette();
    fn();
  }

  return (
    <Ctx.Provider value={api}>
      {children}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[16vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onKeyDown={(e) => {
              // the input is the only focusable element - keep Tab inside
              if (e.key === "Tab") e.preventDefault();
            }}
          >
            <button
              aria-label="Close command menu"
              tabIndex={-1}
              className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
              onClick={closePalette}
            />
            <Command
              label="Command menu"
              className="relative z-10 w-[min(560px,92vw)] overflow-hidden rounded-2xl border border-line2 bg-surface shadow-[0_30px_80px_rgba(8,15,40,0.4)]"
            >
              <div className="flex items-center gap-2 border-b border-line px-4">
                <span aria-hidden className="text-ink3">
                  ⌕
                </span>
                <Command.Input
                  autoFocus
                  placeholder="Search for a page, problem, or command…"
                  className="h-12 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink3"
                />
                <Kbd>esc</Kbd>
              </div>
              <Command.List className="max-h-[320px] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-sm text-ink3">
                  No results.
                </Command.Empty>
                {commands.map((cmd) => (
                  <Command.Item
                    key={cmd.id}
                    value={cmd.label}
                    keywords={cmd.keywords}
                    onSelect={() =>
                      run(() => {
                        if (cmd.type === "route" && cmd.href) {
                          router.push(cmd.href);
                        } else if (cmd.action === "toggle-theme") {
                          setTheme(resolvedTheme === "dark" ? "light" : "dark");
                        }
                      })
                    }
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-ink2 aria-selected:bg-bg2 aria-selected:text-ink"
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-bg2 font-mono text-accent"
                    >
                      {cmd.glyph}
                    </span>
                    <span className="flex-1">{cmd.label}</span>
                    <Kbd>↵</Kbd>
                  </Command.Item>
                ))}
              </Command.List>
              <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[11px] text-ink3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </Command>
          </div>,
          document.body
        )}
    </Ctx.Provider>
  );
}
