import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    baseUrl: "http://localhost:8080/api/v1/rooms",
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
    getRoomDetails: build.query<object, GetRoomSchema>({
      query: (payload) => ({
        url: `/${payload?.[ServerKeys.ROOM_ID]}`,
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useJoinRoomMutation,
  useGetRoomDetailsQuery,
} = roomApi;
export default roomApi;
