import { FoodType } from "@/utils/types/food.type";
import { IdType } from "@/utils/types/query.type";

export type UpdateOrderItemType = IdType & {
  quantity: number;
};

export type OrderItemType = {
  orderItemId: number;
  quantity: number;
  price: number;
  foods: FoodType & { rating: number };
};
