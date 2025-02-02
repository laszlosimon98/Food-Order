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
      invalidatesTags(result, error, arg, meta) {
        return [{ type: "Food", foodId: arg.foodId }];
      },
    }),
    updateReview: builder.mutation<any, UpdateReviewType>({
      query: ({ id, ...rest }) => ({
        url: `review/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [
          { type: "Review", id: arg.id },
          { type: "Food", foodId: arg.foodId },
        ];
      },
    }),
    deleteReview: builder.mutation<any, IdType & { foodId: number }>({
      query: ({ id }) => ({
        url: `review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [
          { type: "Review", id: arg.id },
          { type: "Food", foodId: arg.foodId },
        ];
      },
    }),
    deleteReviewComment: builder.mutation<any, IdType & { foodId: number }>({
      query: ({ id }) => ({
        url: `review/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [
          { type: "Review", id: arg.id },
          { type: "Food", foodId: arg.foodId },
        ];
      },
    }),
  }),
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewCommentMutation,
  useDeleteReviewMutation,
} = reviewApi;
