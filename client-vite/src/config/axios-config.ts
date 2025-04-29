import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import axios, {
  HttpStatusCode,
  type AxiosError,
  type AxiosRequestConfig,
} from "axios";

import { useAppDispatch } from "@/hooks/redux-hooks";
import authApi from "@/redux/services/auth-api";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Base Query function
export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      const dispatch = useAppDispatch();

      dispatch(authApi.util.resetApiState());
    }

    return Promise.reject(error);
  },
);
