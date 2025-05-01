import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const landingPageButton = tv({
  base: `
    flex flex-col items-center justify-center
    w-44 h-44 border-2 shadow-md rounded-3xl
    transition
    outline-none group
    active:scale-95
  `,
  variants: {
    intent: {
      join: `
        bg-green-50 border-green-500 text-green-600
        hover:bg-green-100 hover:text-green-800
        dark:bg-green-900 dark:border-green-600 dark:text-green-300
        dark:hover:bg-green-800 dark:hover:text-green-100
      `,
      create: `
        bg-yellow-50 border-yellow-500 text-yellow-600
        hover:bg-yellow-100 hover:text-yellow-800
        dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-300
        dark:hover:bg-yellow-800 dark:hover:text-yellow-100
      `,
    },
  },
  defaultVariants: {
    intent: "join",
  },
});
