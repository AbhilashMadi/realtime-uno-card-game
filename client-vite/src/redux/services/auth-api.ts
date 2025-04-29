import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { updateUser } from "@/redux/features/auth-slice";
import {
  type RegisterSchema,
  type UserSchema,
  type LoginSchema,
} from "@/types/auth-types";

const authApi = createApi({
  reducerPath: "auth_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/auth",
    method: "POST",
    credentials: "include",
  }),
  keepUnusedDataFor: 0,
  endpoints: (build) => ({
    login: build.mutation<UserSchema, LoginSchema>({
      query: (body) => ({
        url: "/login",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(updateUser(data));
      },
    }),
    getMe: build.query<UserSchema, void>({
      query: () => ({ method: "GET", url: "/me" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateUser(data));
        } catch {
          dispatch(updateUser(null));
        }
      },
    }),
    register: build.mutation<UserSchema, RegisterSchema>({
      query: (body) => ({
        url: "/register",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(updateUser(data));
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: "/logout" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(updateUser(null));
      },
    }),
  }),
});

export default authApi;

export const { resetApiState } = authApi.util;
export const {
  useLoginMutation,
  useGetMeQuery,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
