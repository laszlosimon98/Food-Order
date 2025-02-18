import { storeApi } from "@/store/api/storeApi";
import {
  PromotionType,
  CreatePromotionType,
  UpdatePromotionType,
} from "@/utils/types/promotion.type";
import { IdType } from "@/utils/types/query.type";

const promotionApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    createPromotion: builder.mutation<PromotionType, CreatePromotionType>({
      query: (body) => ({
        url: "promotion",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Promotion"],
    }),
    getPromotions: builder.query<PromotionType[], void>({
      query: () => "promotion",
      providesTags: ["Promotion"],
    }),
    getPromotionById: builder.query<PromotionType, IdType>({
      query: ({ id }) => `promotion/${id}`,
      providesTags(_result, _error, arg, _meta) {
        return [{ type: "Promotion", promotinId: arg.id }];
      },
    }),
    updatePromotion: builder.mutation<PromotionType, UpdatePromotionType>({
      query: ({ id, ...rest }) => ({
        url: `promotion/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Promotion", promotionId: arg.id }];
      },
    }),
    deletePromotion: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `promotion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Promotion", promotionId: arg.id }];
      },
    }),
  }),
});

export const {
  useCreatePromotionMutation,
  useGetPromotionsQuery,
  useGetPromotionByIdQuery,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;
