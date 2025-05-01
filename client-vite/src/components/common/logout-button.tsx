import { Button } from "@heroui/button";
import { type FC } from "react";
import { Tooltip } from "@heroui/tooltip";

import { LogOutIcon } from "@/components/icons";
import { useLogoutMutation } from "@/redux/services/auth-api";

const LogoutButton: FC = () => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Tooltip className="font-mono" content="Logout" placement="right">
      <Button
        isIconOnly
        color="danger"
        size="sm"
        variant="solid"
        onPress={handleLogout}
      >
        <LogOutIcon className="size-4" />
      </Button>
    </Tooltip>
  );
};

export default LogoutButton;
