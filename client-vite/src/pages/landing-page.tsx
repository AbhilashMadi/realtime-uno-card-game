import { type FC } from "react";

import { useLogoutMutation } from "@/redux/services/auth-api";

const LandingPage: FC = () => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout({});
  };

  return (
    <main>
      Landing Page <button onClick={handleLogout}>LOG OUT</button>
    </main>
  );
};

export default LandingPage;
