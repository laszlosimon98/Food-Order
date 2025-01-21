import { storeApi } from "@/store/api/storeApi";
import { IdType } from "@/utils/types/query.type";
import { CreateReviewType, UpdateReviewType } from "@/utils/types/review.type";

const reviewApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation<any, CreateReviewType>({
      query: (body) => ({
        url: "review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation<any, UpdateReviewType>({
      query: ({ id, ...rest }) => ({
        url: `review/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReviewComment: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `review/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewCommentMutation,
  useDeleteReviewMutation,
} = reviewApi;
