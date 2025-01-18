import { LoginType } from "@/auth/components/Login";
import { RegisterType } from "@/auth/components/Register";
import { ModifyResultType } from "@/shared/types/query.types";
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
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<LoginResultType, LoginType>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<ModifyResultType, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: builder.query<any, void>({
      query: () => "auth/currentUser",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
