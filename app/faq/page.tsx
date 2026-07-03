import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CtaBand } from "@/components/sections/CtaBand";
import { faqCategories } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about joining OptimatX, what we do, getting involved, and competitions.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered."
        lead="New here? Start with these. Still stuck? The Contact page and the ⌘K search have you covered."
        color="accent"
      />

      <section className="container-site pb-16">
        <div className="max-w-3xl">
          {faqCategories.map((cat) => (
            <div key={cat.heading} className="mb-10">
              <SectionEyebrow color="accent">{cat.heading}</SectionEyebrow>
              <div className="mt-4 space-y-3">
                {cat.items.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-card border-[1.5px] border-line2 bg-surface"
                  >
                    <summary className="flex cursor-pointer list-none items-start gap-3 p-5 [&::-webkit-details-marker]:hidden">
                      <span
                        aria-hidden
                        className="mt-0.5 font-mono text-accent transition-transform group-open:rotate-90"
                      >
                        ▸
                      </span>
                      <span className="flex-1 text-[16px] font-semibold text-ink">
                        {item.q}
                      </span>
                    </summary>
                    <p className="border-t border-line px-5 py-4 text-[15px] leading-relaxed text-ink2">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Still have a question?"
          subtitle="If it isn't here, just ask - we're friendly, and we reply."
          primary={{ label: "Say hello", href: "/contact" }}
          secondary={{ label: "Join OptimatX →", href: "/join" }}
        />
      </section>
    </>
  );
}
