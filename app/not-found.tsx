import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-magenta">
        Error 404
      </p>
      <div
        aria-hidden
        className="mt-4 text-[clamp(4rem,14vw,8rem)] font-extrabold leading-none text-accent"
      >
        ∅
      </div>
      <h1 className="mt-2 text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight text-ink">
        This page is the empty set.
      </h1>
      <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink2">
        Nothing here - the page you&apos;re after doesn&apos;t exist, or it moved.
        Let&apos;s get you back to something that does.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">← Back home</Button>
        <Button href="/problems" variant="ghost">
          ∫ Problem of the Week
        </Button>
      </div>
    </section>
  );
}
