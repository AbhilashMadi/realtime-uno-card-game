import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useState, type FC } from "react";
import { Alert } from "@heroui/alert";

import { EyeIcon } from "../icons";

interface IJoinRoomForm {
  isOpen: boolean;
  onClose: () => void;
}

const JoinRoomForm: FC<IJoinRoomForm> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordView = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form>
          <ModalHeader className="flex flex-col gap-1">Join Room</ModalHeader>
          <ModalBody>
            <Input
              isClearable
              isRequired
              label="Room ID"
              name="room_id"
              placeholder="e.g., 2T240LGW"
              variant="bordered"
            />
            <Input
              endContent={
                <button type="button" onClick={togglePasswordView}>
                  <EyeIcon open={showPassword} />
                </button>
              }
              label="Room Password"
              name="room_password"
              placeholder="Enter room password for access if it is private!"
              type={showPassword ? "text" : "password"}
              variant="bordered"
            />
            <Alert color="danger" />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              Join Now
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default JoinRoomForm;
