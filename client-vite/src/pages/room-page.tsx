import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import envConfig from "@/config/env-config";
import SocketService from "@/lib/socket-service";
import { useGetRoomDetailsMutation } from "@/redux/services/room-api";
import ServerKeys from "@/utils/server-keys";
import GameLogsSection from "@/components/game-logs-section";
import ChatSection from "@/components/chat-section";
import GamePlaygroundSection from "@/components/game-playground-section";
import CardsSection from "@/components/cards-section";

const RoomPage: FC = () => {
  const { room_id } = useParams<{ room_id: string }>();
  const [getRoomDetails] = useGetRoomDetailsMutation();

  const socket = SocketService.getInstance();

  const waitForSocketConnection = (): Promise<void> => {
    return new Promise((resolve) => {
      if (socket.isConnected()) return resolve();
      socket.once("connect", () => resolve());
    });
  };

  const handleRoomJoined = (payload: any) => {
    console.log("[RoomPage] Joined room:", payload);
  };

  const fetchRoomAndJoin = async (roomId: string) => {
    const socketId = socket.getSocketId();

    if (!socketId) {
      console.error("[RoomPage] Socket ID not available");

      return;
    }

    try {
      const roomDetails = await getRoomDetails({
        [ServerKeys.ROOM_ID]: roomId,
        [ServerKeys.SOCKET_ID]: socketId,
      }).unwrap();

      console.log("[RoomPage] Room details:", roomDetails);

      // Only needed if backend doesn't join on your behalf
      // socket.joinRoom(roomId);

      socket.on("room:joined", handleRoomJoined);
    } catch (error) {
      console.error("[RoomPage] Failed to get room details:", error);
    }
  };

  const initializeSocket = async () => {
    if (!socket.isConnected()) {
      socket.init({ url: envConfig.BACKEND_ROOM_SOCKET_URL });
      socket.connect();
    }

    await waitForSocketConnection();
    await fetchRoomAndJoin(room_id!);
  };

  useEffect(() => {
    if (!room_id) return;

    initializeSocket();

    return () => {
      socket.off("room:joined", handleRoomJoined);
      socket.disconnect();
    };
  }, [room_id]);

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-3 w-full">
      <GameLogsSection />
      <GamePlaygroundSection />
      <ChatSection />
      <CardsSection />
    </div>
  );
};

export default RoomPage;
