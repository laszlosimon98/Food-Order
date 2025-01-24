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
      // invalidatesTags: ["Auth"],
      invalidatesTags(result, error, arg, meta) {
        return [{ type: "Auth", username: arg.username }];
      },
    }),
    login: builder.mutation<LoginResultType, LoginType>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags(result, error, arg, meta) {
        return [{ type: "Auth", username: arg.username }];
      },
    }),
    logout: builder.mutation<ResultType, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => "auth/currentUser",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
