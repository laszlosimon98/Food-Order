import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/features/category/api/categoryApi";
import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import InputText from "@/features/shared/components/form/InputText";
import Loading from "@/features/shared/components/Loading";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  categoryName: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
});

type DataType = z.infer<typeof schema>;

const DashboardCategoryForm = (): ReactElement => {
  const { categoryId } = useParams();

  const { data: category, isLoading } = useGetCategoryByIdQuery(
    { id: parseInt(categoryId as string) },
    { skip: categoryId === undefined }
  );

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<DataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryName: category?.categoryName,
    },
  });

  const [useCreateCategory] = useCreateCategoryMutation();
  const [useUpdateCategory] = useUpdateCategoryMutation();

  const handleAction: SubmitHandler<DataType> = async (data) => {
    const { categoryName } = data;
    try {
      let result;

      if (!categoryId) {
        result = await useCreateCategory({ categoryName }).unwrap();
      } else {
        result = await useUpdateCategory({
          id: parseInt(categoryId),
          categoryName,
        }).unwrap();
      }

      if (result.isSuccess) {
        navigate(location.state.redirectTo);
      }
    } catch (err: any) {
      setError("root", {
        message: err.data.message,
      });
    }
  };

  useEffect(() => {
    if (category) {
      setValue("categoryName", category.categoryName);
    }
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormContainer
      title={`${category ? "Kategória módosítás" : "Új Kategória"}`}
      onSubmit={handleSubmit(handleAction)}
    >
      {errors.root && (
        <ErrorText className="text-lg text-center mt-3">
          {errors.root.message}
        </ErrorText>
      )}

      <InputText {...register("categoryName")} label="Név" />
      {errors.categoryName && (
        <ErrorText>{errors.categoryName.message}</ErrorText>
      )}

      <div className="flex gap-10">
        <RedirectButton buttonText="Vissza" route={location.state.redirectTo} />
        <Button variant="secondary">
          {category ? "Módosít" : "Létrehozás"}
        </Button>
      </div>
    </FormContainer>
  );
};

export default DashboardCategoryForm;
