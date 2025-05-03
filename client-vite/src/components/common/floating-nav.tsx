import { type FC } from "react";

import LogoutButton from "./logout-button";
import { ThemeSwitch } from "./theme-switch";
import Profile from "./profile";

const FloatingNav: FC = () => {
  return (
    <aside>
      <div className="p-2 rounded-xl shadow dark:bg-zinc-600 flex flex-col gap-2">
        <Profile />
        <ThemeSwitch />
        <LogoutButton />
      </div>
    </aside>
  );
};

export default FloatingNav;
