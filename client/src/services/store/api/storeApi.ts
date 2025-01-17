import { saveToken } from "@/auth/slice/authSlice";
import { RootState } from "@/storeTypes/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:3000";

export const storeApi = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
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
  },
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
