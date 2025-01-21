import { storeApi } from "@/store/api/storeApi";
import { RegisterType } from "@/features/auth/components/Register";
import { LoginType } from "@/features/auth/components/Login";
import { ResultType, LoginResultType } from "@/utils/types/query.type";

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
