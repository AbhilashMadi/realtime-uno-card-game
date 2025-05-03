import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  CreateRoomFormSchema,
  CreateRoomResponseSchema,
  JoinRoomFormSchema,
  JoinRoomResponseSchema,
} from "@/types/room-types";

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
  }),
});

export const { useCreateRoomMutation, useJoinRoomMutation } = roomApi;
export default roomApi;
