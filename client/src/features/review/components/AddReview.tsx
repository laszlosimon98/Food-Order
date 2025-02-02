import { useAddReviewMutation } from "@/features/review/api/reviewApi";
import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextArea from "@/features/shared/components/form/TextArea";
import TextInput from "@/features/shared/components/form/TextInput";
import { CreateReviewType } from "@/utils/types/review.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
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

const AddReview = (): ReactElement => {
  const { foodId } = useParams();
  const [useAddReview] = useAddReviewMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewDataType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ReviewDataType> = async (data) => {
    const { rating, description } = data;

    const sendData: CreateReviewType = {
      rating: rating,
      reviewDate: new Date(),
      foodId: parseInt(foodId as string),
      reviewText: description,
    };

    const { isSuccess } = await useAddReview(sendData).unwrap();

    if (isSuccess) {
      navigate(`/foods/${foodId}`);
    }
  };

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
          Értékel
        </Button>
      </div>
    </FormContainer>
  );
};

export default AddReview;
