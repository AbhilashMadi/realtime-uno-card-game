import { Tooltip } from "@heroui/tooltip";
import { type FC } from "react";

const Profile: FC = () => {
  return (
    <Tooltip content="Profile" placement="right">
      <div className="avatar-xs avatar-xs-1 mx-auto rounded-md" role="button" />
    </Tooltip>
  );
};

export default Profile;
