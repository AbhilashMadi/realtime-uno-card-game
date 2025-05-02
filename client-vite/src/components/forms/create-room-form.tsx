import { ChangeEvent, type FC, FormEvent, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Alert } from "@heroui/alert";

import { EyeIcon } from "@/components/icons";
import LabeledSwitch from "@/components/custom/labeled-switch";
import ServerKeys from "@/utils/server-keys";
import { type CreateRoomFormSchema } from "@/types/room-types";
import { useCreateRoomMutation } from "@/redux/services/room-api";

interface ICreateRoomForm {
  isOpen: boolean;
  onClose: () => void;
}

const intialFormData: CreateRoomFormSchema = {
  [ServerKeys.NAME]: "",
  [ServerKeys.MAX_PLAYERS]: 2,
  [ServerKeys.IS_PRIVATE]: true,
  [ServerKeys.ROOM_PASSWORD]: "",
  [ServerKeys.CHAT_ENABLED]: true,
};

const CreateRoomForm: FC<ICreateRoomForm> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [createRoom, { isError, isLoading, error, reset }] =
    useCreateRoomMutation();
  const [formData, setFormData] =
    useState<CreateRoomFormSchema>(intialFormData);

  const togglePasswordView = (): void => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSwitchChange = (name: ServerKeys) => {
    return (value: boolean) =>
      setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleFormReset = (): void => {
    setFormData(intialFormData);
    reset();
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createRoom(formData);
  };

  return (
    <Modal backdrop="opaque" isOpen={isOpen} onClose={handleFormReset}>
      <ModalContent>
        <form onReset={handleFormReset} onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Create Room</ModalHeader>
          <ModalBody>
            <Input
              isClearable
              isRequired
              label="Room Name"
              maxLength={40}
              minLength={6}
              name={ServerKeys.NAME}
              placeholder="e.g., Strategy Squad, Chill Lounge"
              value={formData[ServerKeys.NAME]}
              variant="bordered"
              onChange={handleInputChange}
            />
            <Input
              isRequired
              label="Maximum Players"
              max={10}
              min={2}
              name={ServerKeys.MAX_PLAYERS}
              placeholder="Choose a number between 2 and 10"
              type="number"
              value={String(formData[ServerKeys.MAX_PLAYERS])}
              variant="bordered"
              onChange={handleInputChange}
            />
            <LabeledSwitch
              description="Only invited players can join if enabled."
              isSelected={formData[ServerKeys.IS_PRIVATE]}
              label="Private Room"
              onValueChange={handleSwitchChange(ServerKeys.IS_PRIVATE)}
            />
            {formData[ServerKeys.IS_PRIVATE] && (
              <Input
                isRequired
                disabled={!formData[ServerKeys.IS_PRIVATE]}
                endContent={
                  <button type="button" onClick={togglePasswordView}>
                    <EyeIcon open={showPassword} />
                  </button>
                }
                label="Room Password"
                maxLength={12}
                minLength={8}
                name="room_password"
                placeholder="Set a password for private access"
                type={showPassword ? "text" : "password"}
                value={formData[ServerKeys.ROOM_PASSWORD]}
                variant="bordered"
                onChange={handleInputChange}
              />
            )}
            <LabeledSwitch
              description="Let players send messages in the room."
              isSelected={formData[ServerKeys.CHAT_ENABLED]}
              label="Enable Chat"
              onValueChange={handleSwitchChange(ServerKeys.CHAT_ENABLED)}
            />
            {isError && (
              <Alert
                color="warning"
                description={
                  //@ts-ignore
                  error?.data?.error?.message || "Something went wrong"
                }
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              type="reset"
              variant="flat"
              onPress={handleFormReset}
            >
              Cancel
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              Create Now
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomForm;
