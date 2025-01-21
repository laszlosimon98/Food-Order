import { storeApi } from "@/store/api/storeApi";
import { IdType } from "utils/types/query.type";
import {
  PasswordChangeType,
  UpdateRoles,
  UserDetailsType,
  UserType,
} from "utils/types/user.type";

const userApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], void>({
      query: () => "user",
      providesTags: ["User"],
    }),
    updateUserDetails: builder.mutation<any, UserDetailsType>({
      query: (body) => ({
        url: "user/userDetails",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<any, PasswordChangeType>({
      query: (body) => ({
        url: "user/changePassword",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<any, UpdateRoles>({
      query: ({ id, ...rest }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
  useUpdateUserMutation,
} = userApi;
