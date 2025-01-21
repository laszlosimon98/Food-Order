import { storeApi } from "@/store/api/storeApi";
import {
  PromotionType,
  CreatePromotionType,
  UpdatePromotionType,
} from "@/utils/types/promotion.type";

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
    updatePromotion: builder.mutation<PromotionType, UpdatePromotionType>({
      query: ({ id, ...rest }) => ({
        url: `promotion/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Promotion"],
    }),
  }),
});

export const { useCreatePromotionMutation, useUpdatePromotionMutation } =
  promotionApi;
