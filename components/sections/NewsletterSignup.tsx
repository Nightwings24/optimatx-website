import { FormspreeForm } from "@/components/islands/FormspreeForm";
import { GlyphWatermark } from "@/components/ui/GlyphWatermark";

// Mailing-list signup band (build list Cat 3, "primary CTA"). Reuses the shared
// FormspreeForm island, so it inherits the same endpoint wiring, honeypot, and
// "not connected yet" fallback as every other form on the site.
export function NewsletterSignup() {
  return (
    <div className="relative overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface p-8 md:p-10">
      <GlyphWatermark
        glyph="∑"
        color="var(--accent)"
        opacity={0.06}
        size={220}
        className="-right-6 -top-12"
      />
      <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
            The dispatch
          </p>
          <h2 className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
            One email, every fortnight.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink2">
            The current problem, the next talk, and one thing worth thinking
            about. No spam, unsubscribe anytime.
          </p>
        </div>
        <FormspreeForm
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              placeholder: "you@iitp.ac.in",
              autoComplete: "email",
            },
          ]}
          subject="Newsletter signup"
          submitLabel="Subscribe →"
          successTitle="You're on the list."
          successMessage="Watch your inbox for the next dispatch."
        />
      </div>
    </div>
  );
}
