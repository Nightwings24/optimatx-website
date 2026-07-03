import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FormspreeForm } from "@/components/islands/FormspreeForm";
import { IconChip } from "@/components/ui/IconChip";
import { Button } from "@/components/ui/Button";
import type { CategoryColor } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Join OptimatX, the Mathematics Society of IIT Patna. Recruitment is rolling - fill the interest form.",
};

const benefits: {
  glyph: string;
  color: CategoryColor;
  title: string;
  body: string;
}[] = [
  {
    glyph: "∫",
    color: "magenta",
    title: "A weekly habit",
    body: "Problem of the Week keeps your problem-solving sharp all semester.",
  },
  {
    glyph: "φ",
    color: "accent",
    title: "People who get it",
    body: "Reading circles, study groups, and a mentorship program that pairs you with a senior.",
  },
  {
    glyph: "∂",
    color: "amber",
    title: "A stage",
    body: "Write an article, give a 30-minute talk, or help run a flagship event.",
  },
  {
    glyph: "Σ",
    color: "lime",
    title: "Competition prep",
    body: "Train for SRMC, Simon Marais, the Integration Bee, and quant puzzles - together.",
  },
];

const steps = [
  "Fill the interest form below - it takes two minutes.",
  "Come to an intro session and meet the team.",
  "Pick a track: problems, content, events, or design.",
  "Start solving.",
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recruitment · rolling"
        title="Find your optimum."
        lead="Whether you live for olympiad problems or just like a good puzzle, there's a seat at the table. No prerequisites beyond curiosity."
        dot
      >
        <div className="mt-8">
          <Button href="#interest-form">Jump to the form →</Button>
        </div>
      </PageHeader>

      {/* Why join */}
      <section className="container-site pb-16">
        <h2 className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Why join
        </h2>
        <div className="mt-8 grid gap-[18px] sm:grid-cols-2">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex gap-4 rounded-card border-[1.5px] border-line2 bg-surface p-6"
            >
              <IconChip glyph={b.glyph} color={b.color} />
              <div>
                <h3 className="text-[17px] font-bold text-ink">{b.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ink2">
                  {b.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment cycle */}
      <section className="container-site pb-16">
        <h2 className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          How it works
        </h2>
        <ol className="mt-8 space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line2 font-mono text-[13px] font-bold text-accent">
                {i + 1}
              </span>
              <p className="pt-1 text-[16px] leading-relaxed text-ink2">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Interest form */}
      <section id="interest-form" className="container-site scroll-mt-24 pb-20">
        <div className="mx-auto max-w-xl rounded-card border-[1.5px] border-line2 bg-surface p-6 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            Interest form
          </h2>
          <p className="mb-6 mt-2 text-[15px] text-ink2">
            Tell us a little about you and we&apos;ll be in touch.
          </p>
          <FormspreeForm
            subject="OptimatX - join / interest form"
            submitLabel="Count me in →"
            successTitle="Welcome aboard 🎉"
            successMessage="We've got your details - watch your inbox for the next intro session."
            fields={[
              {
                name: "name",
                label: "Full name",
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
                name: "roll",
                label: "Roll number",
                required: true,
                placeholder: "2401CSXX",
              },
              {
                name: "year",
                label: "Year",
                type: "select",
                required: true,
                options: [
                  { value: "1", label: "1st year" },
                  { value: "2", label: "2nd year" },
                  { value: "3", label: "3rd year" },
                  { value: "4", label: "4th year" },
                  { value: "5", label: "5th year / other" },
                ],
              },
              {
                name: "department",
                label: "Department",
                type: "select",
                required: true,
                options: [
                  { value: "mnc", label: "Mathematics & Computing" },
                  { value: "aids", label: "AI & Data Science" },
                  { value: "cse", label: "Computer Science" },
                  { value: "ece", label: "Electronics & Comm." },
                  { value: "ee", label: "Electrical" },
                  { value: "me", label: "Mechanical" },
                  { value: "other", label: "Other" },
                ],
              },
              {
                name: "why",
                label: "Why do you want to join?",
                type: "textarea",
                placeholder: "A problem you loved, a topic you're curious about…",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
