import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { ChangeEvent, FormEvent, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

import { EyeIcon } from "@/components/icons";
import { useJoinRoomMutation } from "@/redux/services/room-api";
import { JoinRoomFormSchema } from "@/types/room-types";
import ServerKeys from "@/utils/server-keys";

interface JoinRoomFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: JoinRoomFormSchema = {
  [ServerKeys.ROOM_ID]: "",
  [ServerKeys.ROOM_PASSWORD]: "",
};

const JoinRoomForm: FC<JoinRoomFormProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<JoinRoomFormSchema>(initialFormData);

  const [joinRoom, { isLoading, isError, error, reset }] =
    useJoinRoomMutation();

  const navigate = useNavigate();

  const togglePasswordView = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Resets the form and closes the modal
  const handleFormReset = () => {
    setFormData(initialFormData);
    reset();
    onClose();
  };

  // Handles form submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await joinRoom(formData).unwrap();
      navigate(`/room/${formData[ServerKeys.ROOM_ID]}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to join room with socket:", error);
    }
  };

  // Render the modal with the form
  return (
    <Modal backdrop="opaque" isOpen={isOpen} onClose={handleFormReset}>
      <ModalContent>
        <form onReset={handleFormReset} onSubmit={handleFormSubmit}>
          {/* Modal header */}
          <ModalHeader className="flex flex-col gap-1">Join Room</ModalHeader>
          <ModalBody>
            {/* Input for Room ID */}
            <Input
              isClearable
              isRequired
              label="Room ID"
              name={ServerKeys.ROOM_ID}
              placeholder="e.g., 2T240LGW"
              value={formData[ServerKeys.ROOM_ID]}
              variant="bordered"
              onChange={handleFormChange}
            />
            {/* Input for Room Password */}
            <Input
              endContent={
                <button type="button" onClick={togglePasswordView}>
                  <EyeIcon open={showPassword} />
                </button>
              }
              label="Room Password"
              name={ServerKeys.ROOM_PASSWORD}
              placeholder="Enter room password for access if it is private!"
              type={showPassword ? "text" : "password"}
              value={formData[ServerKeys.ROOM_PASSWORD]}
              variant="bordered"
              onChange={handleFormChange}
            />
            {/* Error alert if the joinRoom mutation fails */}
            {isError && (
              <Alert
                color="danger"
                description={
                  (error as any)?.data?.error?.message || "Something went wrong"
                }
              />
            )}
          </ModalBody>
          <ModalFooter>
            {/* Cancel button */}
            <Button
              color="danger"
              disabled={isLoading}
              type="reset"
              variant="light"
              onPress={handleFormReset}
            >
              Cancel
            </Button>
            {/* Submit button */}
            <Button color="primary" isLoading={isLoading} type="submit">
              Join Now
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default JoinRoomForm;
