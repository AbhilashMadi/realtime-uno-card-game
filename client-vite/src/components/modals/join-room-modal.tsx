import { type FC } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import JoinRoomForm from "@/components/forms/join-room-form";

interface IJoinRoomModal {
  isOpen: boolean;
  onClose: () => void;
}

const JoinRoomModal: FC<IJoinRoomModal> = ({ isOpen, onClose }) => {
  return (
    <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Join Room</ModalHeader>
        <ModalBody>
          <JoinRoomForm />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onClose}>
            Join Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinRoomModal;
