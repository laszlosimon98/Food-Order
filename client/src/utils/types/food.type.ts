import { CategoryType } from "@/utils/types/category.type";
import { PromotionType } from "@/utils/types/promotion.type";
import { IdType } from "@/utils/types/query.type";
import { ReviewType } from "@/utils/types/review.type";

export type CreateFoodType = {
  name: string;
  description?: string;
  price: number;
  imageUrl: string | null;
  isSpice: boolean;
  isVegetarian: boolean;
  categoryId: number;
};

export type FoodType = {
  foodId: number;
} & CreateFoodType & {
    categories: CategoryType;
    promotions: PromotionType[];
    reviews: ReviewType[];
    discountPrice?: number;
  };

export type UpdateFoodType = IdType & Partial<CreateFoodType>;

export type FavoriteFoodType = {
  foodId: number;
};

export type FoodQueryParamsTypes = {
  isOnPromotion?: boolean;
  isSpice?: boolean;
  isVegetarian?: boolean;
  hasRating?: boolean;
  minValue?: number;
  maxValue?: number;
  categoryId?: number;
  orderByPrice?: "asc" | "desc";
  orderByRating?: "asc" | "desc";
  page?: number;
  limit?: number;
};
