import { LoginType } from "@/home/components/Login";
import { RegisterType } from "@/home/components/Register";
import { storeApi } from "@/storeTypes/api/storeApi";

export type RegisterResultType = {
  isSuccess: boolean;
};

export type LoginResultType = {
  accessToken: string;
};

export const authApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResultType, RegisterType>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResultType, LoginType>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
