import { saveToken } from "@/auth/slice/authSlice";
import { RootState } from "@/storeTypes/store";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:3000";

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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { data } = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (data) {
      const accessToken: string = data.accessToken;
      api.dispatch(saveToken({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const storeApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "User",
    "Category",
    "Food",
    "Promotion",
    "Review",
    "FavoriteFood",
    "Order",
    "OrderItem",
    "FileUpload",
  ],
  endpoints: () => ({}),
});
