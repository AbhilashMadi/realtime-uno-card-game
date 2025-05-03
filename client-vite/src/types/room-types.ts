import RoomPermissionsEnum from "@/utils/room-permissions";
import RoomStatus from "@/utils/room-status";
import ServerKeys from "@/utils/server-keys";

export type CreateRoomFormSchema = {
  [ServerKeys.NAME]: string;
  [ServerKeys.MAX_PLAYERS]: number;
  [ServerKeys.IS_PRIVATE]: boolean;
  [ServerKeys.ROOM_PASSWORD]: string;
  [ServerKeys.CHAT_ENABLED]: boolean;
};

export type JoinedPlayerSchema = {
  [ServerKeys.USER]: string;
  [ServerKeys.USERNAME]: string;
  [ServerKeys.JOINED_AT]: string;
};

export type ChatMessageSchema = {
  [ServerKeys.MESSAGE]: string;
  [ServerKeys.USER]: string;
  [ServerKeys.USERNAME]: string;
  [ServerKeys.TIMESTAMP]: string;
};

export type CreateRoomResponseSchema = {
  [ServerKeys.SUCCESS]: true;
  [ServerKeys.MESSAGE]: string;
  [ServerKeys.TIMESTAMP]: string;
  [ServerKeys.DATA]: {
    [ServerKeys.ROOM_ID]: string;
    [ServerKeys.NAME]: string;
    [ServerKeys.HOST]: string;
    [ServerKeys.MAX_PLAYERS]: number;
    [ServerKeys.CHAT_ENABLED]: boolean;
    [ServerKeys.STATUS]: RoomStatus;
    [ServerKeys.IS_PRIVATE]: boolean;
    [ServerKeys.LOGS]: string[];
    [ServerKeys.PLAYERS]: JoinedPlayerSchema[];
    [ServerKeys.CHAT_MESSAGES]: ChatMessageSchema[];
    [ServerKeys.CREATED_AT]: string;
    [ServerKeys.UPDATED_AT]: string;
  };
};

export type JoinRoomFormSchema = {
  [ServerKeys.ROOM_ID]: string;
  [ServerKeys.ROOM_PASSWORD]: string;
};

export type JoinRoomResponseSchema = {
  [ServerKeys.SUCCESS]: boolean;
  [ServerKeys.MESSAGE]: string;
  [ServerKeys.DATA]: {
    [ServerKeys.ROOM_ID]: "8L01LU64";
    [ServerKeys.NAME]: "Room No 1";
    [ServerKeys.MAX_PLAYERS]: 3;
    [ServerKeys.PLAYERS]: JoinedPlayerSchema[];
    [ServerKeys.CHAT_MESSAGES]: ChatMessageSchema[];
    [ServerKeys.PERMISSIONS]: RoomPermissionsEnum;
  };
  [ServerKeys.TIMESTAMP]: string;
};
