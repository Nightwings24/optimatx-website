"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Giscus comment threads, backed by the repo's GitHub Discussions (free, no
// backend). Embedded under blog posts, problem pages, and the /discuss board.
// Requires the giscus GitHub app installed on the repo:
// https://github.com/apps/giscus
//
// These IDs are public by design (they ship in every giscus embed). The
// category is "Announcements" (announcement-type) per giscus guidance, so only
// maintainers and giscus itself can open threads - visitors can only comment.
// `term` is a stable thread key (mapping: specific), so threads survive the
// eventual optimatx.in domain move, unlike pathname mapping.
const REPO = "Nightwings24/optimatx-website";
const REPO_ID = "R_kgDOTMeS0w";
const CATEGORY = "Announcements";
const CATEGORY_ID = "DIC_kwDOTMeS084DAePX";

const giscusTheme = (theme: string | undefined) =>
  theme === "light" ? "light" : "dark";

export function Giscus({ term }: { term: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Inject once per term. The theme is read from <html data-theme> (set by
  // next-themes before hydration), so this effect doesn't depend on the hook.
  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": REPO,
      "data-repo-id": REPO_ID,
      "data-category": CATEGORY,
      "data-category-id": CATEGORY_ID,
      "data-mapping": "specific",
      "data-term": term,
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": giscusTheme(
        document.documentElement.getAttribute("data-theme") ?? "dark"
      ),
      "data-lang": "en",
      "data-loading": "lazy",
    };
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    host.appendChild(s);

    return () => {
      host.innerHTML = "";
    };
  }, [term]);

  // Follow theme toggles without reloading the widget. A no-op until the
  // giscus iframe exists.
  useEffect(() => {
    document
      .querySelector<HTMLIFrameElement>("iframe.giscus-frame")
      ?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: giscusTheme(resolvedTheme) } } },
        "https://giscus.app"
      );
  }, [resolvedTheme]);

  return <div ref={ref} className="giscus" />;
}
