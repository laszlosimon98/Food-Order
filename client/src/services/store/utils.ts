import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const transformError = (baseQueryReturnValue: FetchBaseQueryError) => {
  const { data } = baseQueryReturnValue as {
    data: {
      message: string;
      statusCode: number;
    };
  };

  return data;
};
