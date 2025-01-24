import { IdType } from "@/utils/types/query.type";

export type CreateCategoryType = {
  categoryName: string;
};

export type CategoryType = {
  categoryId: number;
} & CreateCategoryType;

export type UpdateCategoryType = IdType & Partial<CreateCategoryType>;
