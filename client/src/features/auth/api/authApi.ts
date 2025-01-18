import { LoginType } from "@/auth/components/Login";
import { RegisterType } from "@/auth/components/Register";
import { ResultType, LoginResultType } from "utils/types/query.type";
import { storeApi } from "@/storeTypes/api/storeApi";

export const authApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ResultType, RegisterType>({
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
    logout: builder.mutation<ResultType, void>({
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
