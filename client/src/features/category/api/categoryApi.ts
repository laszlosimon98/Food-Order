import { storeApi } from "@/store/api/storeApi";
import {
  CategoryType,
  CreateCategoryType,
  UpdateCategoryType,
} from "@/utils/types/category.type";
import { IdType } from "@/utils/types/query.type";

const categoryApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation<CategoryType, CreateCategoryType>({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Category", categoryName: arg.categoryName }];
      },
    }),
    getCategories: builder.query<CategoryType[], void>({
      query: () => "category",
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<CategoryType, IdType>({
      query: ({ id }) => `category/${id}`,
      providesTags(_result, _error, arg, _meta) {
        return [{ type: "Category", id: arg.id }];
      },
    }),
    updateCategory: builder.mutation<any, UpdateCategoryType>({
      query: ({ id, ...rest }) => ({
        url: `category/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Category", id: arg.id }];
      },
    }),
    deleteCategory: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Category", id: arg.id }];
      },
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
