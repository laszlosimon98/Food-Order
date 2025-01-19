import { IdType, ResultType } from "utils/types/query.type";
import { storeApi } from "@/storeTypes/api/storeApi";
import {
  CreateFoodType,
  FavoriteFoodType,
  FoodQueryParamsTypes,
  FoodType,
  UpdateFoodType,
} from "utils/types/food.type";

const foodApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    addFood: builder.mutation<ResultType, CreateFoodType>({
      query: (body) => ({
        url: "food",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Food"],
    }),
    getFoods: builder.query<FoodType[], FoodQueryParamsTypes>({
      query: (params) => ({
        url: "food",
        params,
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
    getFoodById: builder.query<FoodType, IdType>({
      query: ({ id }) => `food/${id}`,
      providesTags: ["Food"],
    }),
    updateFood: builder.mutation<any, UpdateFoodType>({
      query: ({ id, ...body }) => ({
        url: `food/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Food"],
    }),
    deleteFood: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Food"],
    }),
    addFavoriteFood: builder.mutation<any, FavoriteFoodType>({
      query: (body) => ({
        url: "favorite-food",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FavoriteFood"],
    }),
    deleteFavoriteFood: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `favorite-food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FavoriteFood"],
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
  useAddFavoriteFoodMutation,
  useDeleteFavoriteFoodMutation,
} = foodApi;
