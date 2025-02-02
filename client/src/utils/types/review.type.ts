import { IdType } from "@/utils/types/query.type";
import { UserType } from "@/utils/types/user.type";

export type CreateReviewType = {
  rating: number;
  reviewText?: string;
  foodId: number;
};

export type ReviewType = {
  reviewId: number;
} & CreateReviewType & {
    userId: number;
    isEditable: boolean;
    user: UserType;
    createdAt: Date;
    updatedAt: Date;
  };

export type UpdateReviewType = IdType & Partial<CreateReviewType>;
