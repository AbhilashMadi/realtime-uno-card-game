import { type FC } from "react";

import Card from "./custom/card";

import cards from "@/data/cards.json";

const GamePlaygroundSection: FC = () => {
  return (
    <section className="col-span-2 row-span-2 rounded-xl p-2 dark:bg-zinc-700 bg-gray-200">
      Game Playground Section
      {cards.map((o) => (
        <Card key={o.id} {...o} />
      ))}
    </section>
  );
};

export default GamePlaygroundSection;
