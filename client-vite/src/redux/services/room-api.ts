import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CreateRoomFormSchema } from "@/types/room-types";

const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/rooms",
    credentials: "include",
  }),
  endpoints: (build) => ({
    createRoom: build.mutation<object, CreateRoomFormSchema>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomApi;
export default roomApi;
