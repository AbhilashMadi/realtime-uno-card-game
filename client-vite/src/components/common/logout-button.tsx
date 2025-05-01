import { Button } from "@heroui/button";
import { type FC } from "react";

import { LogOutIcon } from "@/components/icons";
import { useLogoutMutation } from "@/redux/services/auth-api";

const LogoutButton: FC = () => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button isIconOnly color="danger" variant="solid" onClick={handleLogout}>
      <LogOutIcon />
    </Button>
  );
};

export default LogoutButton;
