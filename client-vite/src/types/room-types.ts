import ServerKeys from "@/utils/server-keys";

export type CreateRoomFormSchema = {
  [ServerKeys.NAME]: string;
  [ServerKeys.MAX_PLAYERS]: number;
  [ServerKeys.IS_PRIVATE]: boolean;
  [ServerKeys.ROOM_PASSWORD]: string;
  [ServerKeys.CHAT_ENABLED]: boolean;
};
