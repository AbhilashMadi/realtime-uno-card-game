import { tv, type VariantProps } from "tailwind-variants";
import { createElement, type ReactNode } from "react";

export type TextProps = {
  variant?: VariantProps<typeof textVariants>["variant"];
  children: ReactNode;
  className?: string;
};

const textVariants = tv({
  base: "text-base",
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      lead: "text-xl text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      small: "text-sm font-medium leading-none",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

// safe inline variants
const inlineVariants = ["lead", "muted", "small", "code"] as const;

const isInlineVariant = (v: string): v is (typeof inlineVariants)[number] =>
  inlineVariants.includes(v as any);

const Text = ({ variant = "p", children, className }: TextProps) => {
  const tag = isInlineVariant(variant) ? "span" : variant;

  return createElement(
    tag,
    { className: textVariants({ variant, className }) },
    children,
  );
};

export default Text;
