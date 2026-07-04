"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// GoatCounter analytics (privacy-first, no cookies, free for non-commercial).
// Off until NEXT_PUBLIC_GOATCOUNTER_CODE is set - create a free account at
// goatcounter.com, pick a code (e.g. "optimatx" -> optimatx.goatcounter.com),
// and add the code as an env var / repo secret. Dev builds never count.
//
// The script counts the initial page load; App Router navigations are
// client-side, so route changes are counted manually below.
const CODE = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE ?? "";
const ENABLED = Boolean(CODE) && process.env.NODE_ENV === "production";

declare global {
  interface Window {
    goatcounter?: { count: (opts?: { path?: string }) => void };
  }
}

export function Analytics() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!ENABLED) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  useEffect(() => {
    if (!ENABLED) return;
    if (firstLoad.current) {
      firstLoad.current = false; // initial load is counted by the script itself
      return;
    }
    window.goatcounter?.count({ path: window.location.pathname });
  }, [pathname]);

  return null;
}
