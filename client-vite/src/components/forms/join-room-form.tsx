import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { type FC } from "react";

interface IJoinRoomForm {
  isOpen: boolean;
  onClose: () => void;
}

const JoinRoomForm: FC<IJoinRoomForm> = ({ isOpen, onClose }) => {
  return (
    <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Join Room</ModalHeader>
        <ModalBody>
          <form>Join Room</form>
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

export default JoinRoomForm;
