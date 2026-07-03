import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { DarkFeatureBox } from "@/components/sections/DarkFeatureBox";
import { MapEmbed } from "@/components/sections/Embeds";
import { FormspreeForm } from "@/components/islands/FormspreeForm";
import { SITE, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach OptimatX - email, campus location, and socials. ${SITE.email}`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        lead="Questions, collaboration ideas, or just want to solve something together? Reach out - we read everything."
      />

      <section className="container-site grid gap-8 pb-16 md:grid-cols-2">
        <DarkFeatureBox glyph="φ">
          <h2 className="text-xl font-bold text-onbox">Reach us directly</h2>
          <dl className="mt-6 space-y-5 text-[15px]">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-onbox/50">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-accent-onbox hover:underline"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-onbox/50">
                Campus
              </dt>
              <dd className="mt-1 text-onbox/85">{SITE.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-onbox/50">
                Social
              </dt>
              <dd className="mt-2 flex flex-wrap gap-4 font-mono text-[13px] uppercase tracking-wide">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-onbox/70 transition-colors hover:text-onbox"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </DarkFeatureBox>

        <div className="rounded-card border-[1.5px] border-line2 bg-surface p-6 md:p-8">
          <h2 className="mb-5 text-xl font-bold text-ink">Send a message</h2>
          <FormspreeForm
            subject="OptimatX - contact form"
            submitLabel="Send message →"
            successMessage="Thanks for reaching out - we'll reply to your email soon."
            fields={[
              {
                name: "name",
                label: "Your name",
                required: true,
                autoComplete: "name",
                placeholder: "Ada Lovelace",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                required: true,
                autoComplete: "email",
                placeholder: "you@iitp.ac.in",
              },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                required: true,
                placeholder: "What's on your mind?",
              },
            ]}
          />
        </div>
      </section>

      <section className="container-site pb-16 md:pb-24">
        <MapEmbed />
      </section>
    </>
  );
}
