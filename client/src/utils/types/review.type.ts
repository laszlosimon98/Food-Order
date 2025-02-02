import { IdType } from "@/utils/types/query.type";
import { UserType } from "@/utils/types/user.type";

export type CreateReviewType = {
  rating: number;
  reviewText?: string;
  reviewDate: Date;
  foodId: number;
};

export type ReviewType = {
  reviewId: number;
} & CreateReviewType & {
    userId: number;
    idEditable: boolean;
    user: UserType;
  };

export type UpdateReviewType = IdType & Partial<CreateReviewType>;
