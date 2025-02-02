import Review from "@/features/review/components/Review";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { ReviewType } from "@/utils/types/review.type";
import { ReactElement } from "react";

type ReviewsProps = {
  reviews: ReviewType[];
};

const Reviews = ({ reviews }: ReviewsProps): ReactElement => {
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);
  return (
    <>
      <h2 className="text-lg text-center mt-4 font-semibold">Értékelések</h2>
      {reviews &&
        reviews.map((review) => (
          <Review
            key={review.reviewId}
            review={review}
            currentUser={currentUser}
          />
        ))}
    </>
  );
};

export default Reviews;
