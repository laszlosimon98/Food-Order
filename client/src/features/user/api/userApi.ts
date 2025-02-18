import { storeApi } from "@/store/api/storeApi";
import { RolesEnum } from "@/utils/roles";
import { IdType } from "utils/types/query.type";
import {
  PasswordChangeType,
  UpdateRoles,
  UserDetailsType,
  UserType,
} from "utils/types/user.type";

const userApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], { role?: RolesEnum }>({
      query: (params) => ({
        url: "user",
        params,
      }),
      providesTags: ["User"],
    }),
    updateUserDetails: builder.mutation<any, UserDetailsType>({
      query: (body) => ({
        url: "user/userDetails",
        method: "PATCH",
        body,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "User", userId: arg.userId }];
      },
    }),
    changePassword: builder.mutation<any, PasswordChangeType>({
      query: (body) => ({
        url: "user/changePassword",
        method: "PATCH",
        body,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "User", userId: arg.userId }];
      },
    }),
    updateUserRole: builder.mutation<any, UpdateRoles>({
      query: ({ id, role }) => ({
        url: `user/${id}`,
        method: "PATCH",
        params: { role },
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "User", userId: arg.id }];
      },
    }),
    deleteUser: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "User", userId: arg.id }];
      },
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
  useUpdateUserRoleMutation,
} = userApi;
