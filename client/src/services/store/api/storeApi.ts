import { authApi } from "@/features/auth/api/authApi";
import { saveToken } from "@/features/auth/slice/authSlice";
import { RootState } from "@/store/store";
import { UserType } from "@/utils/types/user.type";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const URL = `${process.env.SERVER}/api/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers: Headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.data.accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let queryResult = await baseQuery(args, api, extraOptions);

  if (queryResult.error && queryResult.error.status === 401) {
    const { data } = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (data) {
      const currentUser = await baseQuery(
        {
          url: "auth/currentUser",
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
            "Content-Type": "application/json",
          },
        },
        api,
        extraOptions
      );

      if (currentUser.data) {
        api.dispatch(
          saveToken({
            accessToken: data.accessToken,
            currentUser: currentUser.data as UserType,
          })
        );
        queryResult = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return queryResult;
};

export const storeApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Category",
    "Food",
    "Promotion",
    "Review",
    "Order",
    "OrderItem",
  ],
  endpoints: () => ({}),
});
