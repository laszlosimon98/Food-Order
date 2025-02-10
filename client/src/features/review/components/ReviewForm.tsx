import {
  useAddReviewMutation,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
} from "@/features/review/api/reviewApi";
import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextArea from "@/features/shared/components/form/TextArea";
import TextInput from "@/features/shared/components/form/InputText";
import Loading from "@/features/shared/components/Loading";
import { CreateReviewType, UpdateReviewType } from "@/utils/types/review.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  rating: z.coerce
    .number()
    .min(1, { message: "Minimum 1" })
    .max(5, { message: "Maximum 5" })
    .int(),
  description: z.string().optional(),
});

type ReviewDataType = z.infer<typeof schema>;

const ReviewForm = (): ReactElement => {
  const { foodId, reviewId } = useParams();

  const { data: review, isLoading } = useGetReviewByIdQuery({
    id: parseInt(reviewId as string),
    foodId: parseInt(foodId as string),
  });

  const [useAddReview] = useAddReviewMutation();
  const [useUpdateReview] = useUpdateReviewMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviewDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: review?.rating,
      description: review?.reviewText,
    },
  });

  useEffect(() => {
    if (review && !isLoading) {
      setValue("rating", review.rating);
      setValue("description", review.reviewText);
    }
  }, [review, isLoading]);

  const onSubmit: SubmitHandler<ReviewDataType> = async (data) => {
    const { rating, description } = data;

    const sendData: UpdateReviewType = {
      id: parseInt(reviewId as string),
      rating: rating,
      foodId: parseInt(foodId as string),
      reviewText: description,
    };

    let result;
    if (!reviewId) {
      const { id, ...rest } = sendData;
      result = await useAddReview(rest as CreateReviewType);
    } else {
      result = await useUpdateReview(sendData);
    }

    if (result.data.isSuccess) {
      navigate(`/foods/${foodId}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormContainer title="Értékelés" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <ErrorText className="text-lg text-center mt-3">
          {errors.root.message}
        </ErrorText>
      )}

      <TextInput {...register("rating")} label="Értékelés" type="number" />
      {errors.rating && <ErrorText>{errors.rating.message}</ErrorText>}

      <TextArea {...register("description")} label="Leírás" />
      {errors.description && (
        <ErrorText>{errors.description.message}</ErrorText>
      )}

      <div className="flex justify-center items-center ">
        <Button variant="primary" size="default" className="mt-5">
          {reviewId ? "Módosít" : "Értékel"}
        </Button>
      </div>
    </FormContainer>
  );
};

export default ReviewForm;
