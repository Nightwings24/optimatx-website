import Link from "next/link";
import { cn } from "@/lib/cn";

// design.md §6.2 - primary (solid green + glow), ghost (bordered), and
// cta-secondary (translucent light chip, for use on the indigo CTA panel).
type Variant = "primary" | "ghost" | "cta-secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-bold text-[0.95rem] leading-none whitespace-nowrap select-none transition-[transform,box-shadow,background-color,border-color,color] duration-150";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-fill text-white px-6 py-[15px] shadow-[0_8px_22px_color-mix(in_srgb,var(--accent)_32%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_color-mix(in_srgb,var(--accent)_42%,transparent)]",
  ghost:
    "bg-transparent text-ink border-[1.5px] border-line2 px-6 py-[13.5px] hover:border-accent hover:text-accent hover:-translate-y-0.5",
  "cta-secondary":
    "bg-white/10 text-onbox border border-white/25 px-6 py-[13.5px] hover:bg-white/20 hover:-translate-y-0.5",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonProps = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, className: _c, children: _ch, ...rest } = props;
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
