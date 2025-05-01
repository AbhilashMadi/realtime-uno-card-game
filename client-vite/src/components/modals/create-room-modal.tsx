import { type FC } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import CreateRoomForm from "@/components/forms/create-room-form";

interface ICreateRoomModal {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal: FC<ICreateRoomModal> = ({ isOpen, onClose }) => {
  return (
    <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Room</ModalHeader>
        <ModalBody>
          <CreateRoomForm />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onClose}>
            Create Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
