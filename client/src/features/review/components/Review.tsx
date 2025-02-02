import {
  useDeleteReviewCommentMutation,
  useDeleteReviewMutation,
} from "@/features/review/api/reviewApi";
import Star from "@/features/review/components/Star";
import Button from "@/features/shared/components/Button";
import { convertDate } from "@/utils/convertDate";
import { hasPermission, RolesEnum } from "@/utils/roles";
import { ReviewType } from "@/utils/types/review.type";
import { UserType } from "@/utils/types/user.type";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

type ReviewProps = {
  review: ReviewType;
  currentUser?: UserType;
};

const Review = ({ review, currentUser }: ReviewProps): ReactElement => {
  const [useDeleteReview] = useDeleteReviewMutation();
  const [useDeleteReviewComment] = useDeleteReviewCommentMutation();

  const handleDelete = async () => {
    await useDeleteReview({
      id: review.reviewId,
      foodId: review.foodId,
    });
  };

  const handleCommentDelete = async () => {
    await useDeleteReviewComment({
      id: review.reviewId,
      foodId: review.foodId,
    });
  };

  return (
    <div
      key={review.reviewId}
      className="shadow-md rounded-xl w-4/5 p-4 my-2 md:w-2/3 lg:w-1/2"
    >
      <section className="flex flex-wrap justify-around items-center">
        <div>
          <h3>Értékelő</h3>
          <div className="pl-2">{review.user.fullname}</div>
        </div>

        <div>
          <h3>Értékelés</h3>
          <Star rating={review.rating} className="text-baseColor" />
          <Star rating={5 - review.rating} />
        </div>

        <div className="text-xs">
          <p> Létrehozva: {convertDate(`${review.createdAt}`)} </p>
          <p> Módosítva: {convertDate(`${review.updatedAt}`)} </p>
        </div>
      </section>

      <h3 className="pl-5 pt-3 font-semibold">Leírás</h3>

      <div className="w-5/6 mx-auto ">{review.reviewText}</div>

      <div className="flex flex-wrap gap-3 mt-3 justify-center items-center md:gap-12">
        {hasPermission<ReviewType>([RolesEnum.USER], currentUser, review) &&
          review.isEditable && (
            <>
              <Button variant="secondary">
                <Link to={`/reviews/${review.reviewId}/food/${review.foodId}`}>
                  Módosítás
                </Link>
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Törlés
              </Button>
            </>
          )}

        {hasPermission([RolesEnum.EMPLOYEE], currentUser) &&
          review.isEditable && (
            <Button variant="danger" onClick={handleCommentDelete}>
              Komment törlése
            </Button>
          )}
      </div>
    </div>
  );
};

export default Review;
