import { storeApi } from "@/store/api/storeApi";
import {
  CreateFoodType,
  FoodType,
  FoodQueryParamsTypes,
  UpdateFoodType,
  FavoriteFoodType,
} from "@/utils/types/food.type";
import { ResultType, IdType } from "@/utils/types/query.type";

const foodApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    addFood: builder.mutation<ResultType, CreateFoodType>({
      query: (body) => ({
        url: "food",
        method: "POST",
        body,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Food", name: arg.name }];
      },
    }),
    getFoods: builder.query<FoodType[], FoodQueryParamsTypes>({
      query: (params) => ({
        url: "food",
        params,
      }),
      providesTags: ["Food"],
    }),
    getFoodsByIds: builder.query<FoodType[], { id: string[] }>({
      query: ({ id }) => ({
        url: "food/getFoodByIds",
        params: { id },
      }),
      providesTags: ["Food"],
    }),
    getFavoriteFoods: builder.query<FoodType[], void>({
      query: () => "food/favoriteFood",
      providesTags: ["Food"],
    }),
    getTopTenOrder: builder.query<FoodType[], void>({
      query: () => "food/topTenOrder",
      providesTags: ["Food"],
    }),
    getFoodCount: builder.query<number, void>({
      query: () => "food/foodCount",
      providesTags: ["Food"],
    }),
    getFoodById: builder.query<FoodType, IdType>({
      query: ({ id }) => `food/${id}`,
      providesTags(_result, _error, arg, _meta) {
        return [{ type: "Food", id: arg.id }];
      },
    }),
    updateFood: builder.mutation<any, UpdateFoodType>({
      query: ({ id, ...body }) => ({
        url: `food/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Food", id: arg.id }];
      },
    }),
    deleteFood: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Food", id: arg.id }];
      },
    }),
    addFavoriteFood: builder.mutation<any, FavoriteFoodType>({
      query: (body) => ({
        url: "favorite-food",
        method: "POST",
        body,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Food", id: arg.id }];
      },
    }),
    deleteFavoriteFood: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `favorite-food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Food", id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodByIdQuery,
  useGetFavoriteFoodsQuery,
  useGetTopTenOrderQuery,
  useGetFoodCountQuery,
  useGetFoodsByIdsQuery,
  useAddFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useAddFavoriteFoodMutation,
  useDeleteFavoriteFoodMutation,
} = foodApi;
