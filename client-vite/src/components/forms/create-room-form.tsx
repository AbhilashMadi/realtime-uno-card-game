import { type FC, FormEvent, useState } from "react";
import { Input } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { EyeIcon } from "../icons";

import LabeledSwitch from "@/components/custom/labeled-switch";

interface ICreateRoomForm {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomForm: FC<ICreateRoomForm> = ({ isOpen, onClose }) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [chatEnabled, setChatEnabled] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordView = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    values.is_private = isPrivate.toString();
    values.chat_enabled = chatEnabled.toString();

    console.log("Form Submission:", values);
    onClose();
  };

  return (
    <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Create Room</ModalHeader>
          <ModalBody>
            <Input
              isClearable
              isRequired
              label="Room Name"
              name="name"
              placeholder="e.g., Strategy Squad, Chill Lounge"
              variant="bordered"
            />

            <NumberInput
              isRequired
              defaultValue={2}
              label="Maximum Players"
              max={10}
              min={2}
              name="max_players"
              placeholder="Choose a number between 2 and 10"
              variant="bordered"
            />

            <LabeledSwitch
              description="Only invited players can join if enabled."
              isSelected={isPrivate}
              label="Private Room"
              onValueChange={setIsPrivate}
            />

            {isPrivate && (
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={togglePasswordView}>
                    <EyeIcon open={showPassword} />
                  </button>
                }
                label="Room Password"
                name="room_password"
                placeholder="Set a password for private access"
                type={showPassword ? "text" : "password"}
                variant="bordered"
              />
            )}

            <LabeledSwitch
              description="Let players send messages in the room."
              isSelected={chatEnabled}
              label="Enable Chat"
              onValueChange={setChatEnabled}
            />
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create Now
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomForm;
