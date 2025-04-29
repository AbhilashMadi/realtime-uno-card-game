import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "@/config/axios-config";
import { updateUser } from "@/redux/features/auth-slice";
import { type LoginSchema, type UserSchema } from "@/types/auth-types";

const authApi = createApi({
  reducerPath: "auth_api",
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 0,
  endpoints: (build) => ({
    login: build.mutation<UserSchema, LoginSchema>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(updateUser(data));
      },
    }),
    getMe: build.query<UserSchema, void>({
      query: () => ({ method: "GET", url: "/auth/me" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateUser(data));
        } catch {
          dispatch(updateUser(null));
        }
      },
    }),
  }),
});

export default authApi;

export const { resetApiState } = authApi.util;
export const { useLoginMutation, useGetMeQuery } = authApi;
