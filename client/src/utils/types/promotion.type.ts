import { IdType } from "@/utils/types/query.type";

export type CreatePromotionType = {
  promotionName: string;
  description?: string;
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  foodIds: number[];
};

export type PromotionType = {
  promotionId: number;
} & CreatePromotionType & {
    isActive: boolean;
  };

export type UpdatePromotionType = IdType & Partial<CreatePromotionType>;
