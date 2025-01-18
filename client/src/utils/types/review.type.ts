import { IdType } from "utils/types/query.type";

export type CreateReviewType = {
  rating: number;
  reviewText: string;
  reviewDate: Date;
  foodId: number;
};

export type ReviewType = {
  reviewId: number;
} & CreateReviewType & {
    userId: number;
    idEditable: boolean;
  };

export type UpdateReviewType = IdType & Partial<CreateReviewType>;
