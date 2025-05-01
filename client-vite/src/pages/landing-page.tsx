import { type FC } from "react";
import { tv } from "tailwind-variants";

import { AddRoomIcon, GamePodIcon } from "@/components/icons";

const LandingPage: FC = () => {
  const buttonVariants = tv({
    base: `
    flex flex-col items-center justify-center
    w-44 h-44 border-2 shadow-md rounded-3xl
    transition
    outline-none group
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
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

  return (
    <article
      aria-label="UNO Game Lobby Actions"
      className="flex justify-center items-center gap-12 w-full"
    >
      <button
        aria-label="Join an existing room"
        className={buttonVariants({ intent: "join" })}
        type="button"
      >
        <AddRoomIcon
          aria-hidden="true"
          className="w-12 h-12 mb-2 text-green-500"
        />
        <span className="text-base font-medium">Join Room</span>
      </button>

      <button
        aria-label="Create a new room"
        className={buttonVariants({ intent: "create" })}
        type="button"
      >
        <GamePodIcon
          aria-hidden="true"
          className="w-12 h-12 mb-2 text-yellow-500"
        />
        <span className="text-base font-medium">Create Room</span>
      </button>
    </article>
  );
};

export default LandingPage;
