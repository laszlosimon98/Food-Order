import { useGetCategoriesQuery } from "@/features/category/api/categoryApi";
import Categories from "@/features/category/components/Categories";
import {
  useCreateFoodMutation,
  useGetFoodByIdQuery,
  useUpdateFoodMutation,
  useUploadFileMutation,
} from "@/features/food/api/foodApi";
import Button from "@/features/shared/components/Button";
import FileUploader from "@/features/shared/components/fileupload/FileUploader";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextArea from "@/features/shared/components/form/TextArea";
import TextInput from "@/features/shared/components/form/TextInput";
import Loading from "@/features/shared/components/Loading";
import RedirectButton from "@/features/shared/components/RedirectButton";
import Select from "@/features/shared/components/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
  description: z.string().optional(),
  price: z.coerce.number().min(1, { message: "A mező kitöltése kötelező!" }),
  isSpice: z.boolean(),
  isVegetarian: z.boolean(),
  categoryId: z.coerce.number().min(1, { message: "Válasszon kategóriát!" }),
});

type DataType = z.infer<typeof schema>;

const DashboardFoodForm = (): ReactElement => {
  const { foodId } = useParams();

  const { data: food, isLoading } = useGetFoodByIdQuery(
    { id: parseInt(foodId as string) },
    { skip: foodId === undefined }
  );

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const location = useLocation();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [useUploadFile] = useUploadFileMutation();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<DataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: food?.name,
      description: food?.description,
      price: food?.price,
      isSpice: food?.isSpice,
      isVegetarian: food?.isVegetarian,
      categoryId: food?.categoryId,
    },
  });

  const [useCreateFood] = useCreateFoodMutation();
  const [useUpdateFood] = useUpdateFoodMutation();

  const handleAction: SubmitHandler<DataType> = async (data) => {
    try {
      let result;

      if (!foodId) {
        result = await useCreateFood({ ...data, imageUrl: null }).unwrap();
      } else {
        result = await useUpdateFood({
          id: parseInt(foodId),
          ...data,
        }).unwrap();
      }

      await handleFileUpload(parseInt(result.foodId as string));
      navigate(location.state.redirectTo);
    } catch (err: any) {
      setError("root", {
        message: err.data.message,
      });
    }
  };

  const handleFileUpload = async (id: number) => {
    if (!file) return;
    const result = await useUploadFile({ id, file });
    return result;
  };

  useEffect(() => {
    if (food) {
      setValue("name", food.name);
      setValue("description", food.description);
      setValue("price", food.price);
      setValue("isSpice", food.isSpice);
      setValue("isVegetarian", food.isVegetarian);
      setValue("categoryId", food.categoryId);
    }
  }, [food]);

  if (isLoading || isCategoriesLoading) {
    return <Loading />;
  }

  return (
    <FormContainer
      title={`${food ? "Étel módosítás" : "Étel létrehozás"}`}
      onSubmit={handleSubmit(handleAction)}
    >
      {errors.root && (
        <ErrorText className="text-lg text-center mt-3">
          {errors.root.message}
        </ErrorText>
      )}

      <TextInput {...register("name")} label="Név" />
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

      <TextArea {...register("description")} label="Leírás" />
      {errors.description && (
        <ErrorText>{errors.description.message}</ErrorText>
      )}

      <TextInput {...register("price")} label="Ár" type="number" />
      {errors.price && <ErrorText>{errors.price.message}</ErrorText>}

      <div className="flex justify-between w-32">
        <label htmlFor="isSpice">Erős</label>
        <input {...register("isSpice")} type="checkbox" id="isSpice" />
      </div>

      <div className="flex justify-between w-32">
        <label htmlFor="isVegetarian">Vegetáriánus</label>
        <input
          {...register("isVegetarian")}
          type="checkbox"
          id="isVegetarian"
        />
      </div>

      <Select {...register("categoryId")} label="Kategória">
        <Categories categories={categories} />
      </Select>
      {errors.categoryId && <ErrorText>{errors.categoryId.message}</ErrorText>}

      <FileUploader label="Kép" file={file} setFile={setFile} />

      <div className="flex gap-10 pt-5">
        <RedirectButton buttonText="Vissza" route={location.state.redirectTo} />
        <Button variant="secondary">{food ? "Módosít" : "Létrehozás"}</Button>
      </div>
    </FormContainer>
  );
};

export default DashboardFoodForm;
