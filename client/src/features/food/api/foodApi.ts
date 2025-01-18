import { IdType, ModifyResultType } from "@/shared/types/query.types";
import { storeApi } from "@/storeTypes/api/storeApi";

export const foodApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    addFood: builder.mutation<ModifyResultType, any>({
      query: (body) => ({
        url: "food",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Food"],
    }),
    getFoods: builder.query<any, void>({
      query: () => "food",
      providesTags: ["Food"],
    }),
    getFavoriteFoods: builder.query<any, void>({
      query: () => "food/favoriteFood",
      providesTags: ["Food"],
    }),
    getTopTenOrder: builder.query<any, void>({
      query: () => "food/topTenOrder",
      providesTags: ["Food"],
    }),
    getFoodById: builder.query<any, IdType>({
      query: (id) => `food/${id}`,
      providesTags: ["Food"],
    }),
    updateFood: builder.mutation<any, any>({
      query: ({ id, ...body }) => ({
        url: `food/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Food"],
    }),
    deleteFood: builder.mutation<any, IdType>({
      query: (id) => ({
        url: `food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Food"],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodByIdQuery,
  useGetFavoriteFoodsQuery,
  useGetTopTenOrderQuery,
  useAddFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodApi;
