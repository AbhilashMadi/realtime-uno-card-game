import { axiosBaseQuery } from '@/configs/axios-config';
import { createApi } from "@reduxjs/toolkit/query/react";
import { type UserSchema, type LoginSchema } from "@/types/auth-types";


const authApi = createApi({
  reducerPath: "auth_api",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    login: build.mutation<UserSchema, LoginSchema>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        data,
      }),
    }),
  }),
});

export default authApi;

export const {
  resetApiState
} = authApi.util;

export const {
  useLoginMutation,
} = authApi;
