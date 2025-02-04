import { useCreateCategoryMutation } from "@/features/category/api/categoryApi";
import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextInput from "@/features/shared/components/form/TextInput";
import TextSuccess from "@/features/shared/components/form/TextSuccess";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  categoryName: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
  success: z.string().optional(),
});

type DataType = z.infer<typeof schema>;

const CategoryForm = (): ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DataType>({
    resolver: zodResolver(schema),
  });

  const [useCreateCategory] = useCreateCategoryMutation();

  const handleCreate: SubmitHandler<DataType> = async (data) => {
    const { categoryName } = data;
    try {
      const { isSuccess } = await useCreateCategory({ categoryName }).unwrap();

      if (isSuccess) {
        setError("success", {
          message: `A ${categoryName} létrehozva`,
        });
      }
    } catch (err: any) {
      setError("root", {
        message: err.data.message,
      });
    }
  };

  return (
    <FormContainer
      title="Kategória létrehozás"
      onSubmit={handleSubmit(handleCreate)}
    >
      {errors.root && (
        <ErrorText className="text-lg text-center mt-3">
          {errors.root.message}
        </ErrorText>
      )}

      {errors.success && (
        <TextSuccess className="text-lg text-center mt-3">
          {errors.success.message}
        </TextSuccess>
      )}

      <TextInput {...register("categoryName")} label="Kategória név" />
      {errors.categoryName && (
        <ErrorText>{errors.categoryName.message}</ErrorText>
      )}

      <Button variant="secondary">Létrehoz</Button>
    </FormContainer>
  );
};

export default CategoryForm;
