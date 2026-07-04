import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FormspreeForm } from "@/components/islands/FormspreeForm";
import { catVar, catStyle, type CategoryColor } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "OptimatX merchandise - the first drop is in the works. Tell us what you'd wear.",
};

// Planned designs for the first drop - swap these as the real designs land.
const planned: {
  id: string;
  glyph: string;
  color: CategoryColor;
  name: string;
  desc: string;
}[] = [
  {
    id: "tee",
    glyph: "∫",
    color: "accent",
    name: "The Identity Tee",
    desc: "Black tee, small logo on the chest, e^(iπ) + 1 = 0 across the back. The five most important constants, one shirt.",
  },
  {
    id: "hoodie",
    glyph: "φ",
    color: "magenta",
    name: "Conjecture Hoodie",
    desc: "Heavyweight hoodie with \"Conjecture, prove, repeat.\" down the sleeve. For 2 AM problem sets in the winter.",
  },
  {
    id: "stickers",
    glyph: "Σ",
    color: "amber",
    name: "Operator Sticker Pack",
    desc: "Die-cut ∫ ∂ Σ ∇ φ stickers in the club colors. Laptop lids are for theorems.",
  },
];

export default function MerchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Merch"
        title="Wear the argmax."
        lead="The first drop is in the works - nothing is on sale yet. Here's what we're planning; tell us below what you'd actually buy and we'll size the order."
        color="magenta"
      />

      {/* Planned designs */}
      <section className="container-site pb-16">
        <SectionEyebrow color="magenta">First drop · planned</SectionEyebrow>
        <h2 className="sr-only">Planned merchandise</h2>
        <div className="mt-6 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {planned.map((item) => {
            const c = catVar(item.color);
            return (
              <div
                key={item.id}
                style={catStyle(item.color)}
                className="flex flex-col overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface"
              >
                <div
                  className="flex h-32 items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, ${c} 28%, transparent), color-mix(in srgb, ${c} 8%, transparent))`,
                  }}
                >
                  <span
                    aria-hidden
                    className="select-none font-extrabold leading-none"
                    style={{ color: c, opacity: 0.55, fontSize: 72 }}
                  >
                    {item.glyph}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-[17px] font-bold tracking-tight text-ink">
                    {item.name}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-ink2">
                    {item.desc}
                  </p>
                  <span className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                    Coming soon
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interest form */}
      <section className="container-site pb-20">
        <div className="mx-auto max-w-xl rounded-card border-[1.5px] border-line2 bg-surface p-6 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            Count me in
          </h2>
          <p className="mb-6 mt-2 text-[15px] text-ink2">
            No payment, no commitment - just tell us what you&apos;d buy so we
            know how many to make.
          </p>
          <FormspreeForm
            subject="OptimatX - merch interest"
            submitLabel="Count me in →"
            successTitle="Noted."
            successMessage="We'll email you when the drop opens."
            fields={[
              { name: "name", label: "Name", required: true, autoComplete: "name" },
              {
                name: "email",
                label: "Email",
                type: "email",
                required: true,
                autoComplete: "email",
              },
              {
                name: "interest",
                label: "What would you buy?",
                type: "select",
                required: true,
                options: [
                  { value: "tee", label: "The Identity Tee" },
                  { value: "hoodie", label: "Conjecture Hoodie" },
                  { value: "stickers", label: "Operator Sticker Pack" },
                  { value: "everything", label: "All of it" },
                ],
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
