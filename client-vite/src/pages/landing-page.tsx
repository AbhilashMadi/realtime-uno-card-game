import { type FC } from "react";
import { useDisclosure } from "@heroui/modal";

import { AddRoomIcon, GamePodIcon } from "@/components/icons";
import JoinRoomModal from "@/components/modals/join-room-modal";
import { landingPageButton } from "@/components/primitives";
import CreateRoomModal from "@/components/modals/create-room-modal";

const LandingPage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateRoomModalOpen,
    onOpen: onCreateRoomModalOpen,
    onClose: onCreateRoomModalClose,
  } = useDisclosure();

  return (
    <>
      <JoinRoomModal isOpen={isOpen} onClose={onClose} />
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={onCreateRoomModalClose}
      />
      <article
        aria-label="UNO Game Lobby Actions"
        className="flex justify-center items-center gap-12 w-full"
      >
        <button
          aria-label="Join an existing room"
          className={landingPageButton({ intent: "join" })}
          type="button"
          onClick={onOpen}
        >
          <AddRoomIcon
            aria-hidden="true"
            className="w-12 h-12 mb-2 text-green-500"
          />
          <span className="text-base font-medium">Join Room</span>
        </button>

        <button
          aria-label="Create a new room"
          className={landingPageButton({ intent: "create" })}
          type="button"
          onClick={onCreateRoomModalOpen}
        >
          <GamePodIcon
            aria-hidden="true"
            className="w-12 h-12 mb-2 text-yellow-500"
          />
          <span className="text-base font-medium">Create Room</span>
        </button>
      </article>
    </>
  );
};

export default LandingPage;
