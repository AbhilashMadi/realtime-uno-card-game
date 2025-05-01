import { type FC } from "react";

import LogoutButton from "./logout-button";
import { ThemeSwitch } from "./theme-switch";

const FloatingNav: FC = () => {
  return (
    <aside className="p-2 rounded-xl shadow dark:bg-zinc-600 absolute flex flex-col gap-2">
      <ThemeSwitch />
      <LogoutButton />
    </aside>
  );
};

export default FloatingNav;
