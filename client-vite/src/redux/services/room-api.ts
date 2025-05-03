import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import envConfig from "@/config/env-config";
import {
  CreateRoomFormSchema,
  CreateRoomResponseSchema,
  GetRoomSchema,
  JoinRoomFormSchema,
  JoinRoomResponseSchema,
} from "@/types/room-types";
import ServerKeys from "@/utils/server-keys";

const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${envConfig.BACKEND_BASE_URL}/rooms`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    createRoom: build.mutation<CreateRoomResponseSchema, CreateRoomFormSchema>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),
    joinRoom: build.mutation<JoinRoomResponseSchema, JoinRoomFormSchema>({
      query: (body) => ({
        url: `/join`,
        method: "POST",
        body,
      }),
    }),
    getRoomDetails: build.mutation<object, GetRoomSchema>({
      query: (payload) => ({
        url: `/${payload?.[ServerKeys.ROOM_ID]}`,
        headers: { "x-socket-id": payload?.[ServerKeys.SOCKET_ID] },
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useJoinRoomMutation,
  useGetRoomDetailsMutation,
} = roomApi;
export default roomApi;
