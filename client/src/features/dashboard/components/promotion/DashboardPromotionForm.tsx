import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextArea from "@/features/shared/components/form/TextArea";
import Loading from "@/features/shared/components/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  useCreatePromotionMutation,
  useGetPromotionByIdQuery,
} from "@/features/promotion/api/promotionApi";
import RedirectButton from "@/features/shared/components/RedirectButton";
import InputText from "@/features/shared/components/form/InputText";
import InputDate from "@/features/shared/components/form/InputDate";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { CreatePromotionType } from "@/utils/types/promotion.type";
import { toZonedTime } from "date-fns-tz";

const schema = z
  .object({
    promotionName: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
    description: z.string().optional(),
    discountValue: z.coerce
      .number()
      .min(1, { message: "A mező kitöltése kötelező!" })
      .max(100),
    startDate: z
      .string()
      .refine(
        (value) => {
          return !isNaN(new Date(value).getTime());
        },
        {
          message: "Érvénytelen dátum formátum!",
        }
      )
      .transform((value) => new Date(value)),
    endDate: z
      .string()
      .refine(
        (value) => {
          return !isNaN(new Date(value).getTime());
        },
        {
          message: "Érvénytelen dátum formátum!",
        }
      )
      .transform((value) => new Date(value)),
  })
  .refine(
    (data) => data.endDate > data.startDate && data.startDate > new Date(),
    {
      message:
        "Az időpont csak jövőbeli esemény lehet és a záródátum nem lehet korábbi a kezdődátumnál!",
      path: ["endDate"],
    }
  );

type DataType = z.infer<typeof schema>;

const DashBoardPromotionForm = (): ReactElement => {
  const { promotionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const foods = useAppSelector((state) => state.promotion.data.foods);

  const { data: promotion, isLoading } = useGetPromotionByIdQuery(
    { id: parseInt(promotionId as string) },
    { skip: promotionId === undefined }
  );

  const [useCreatePromotion] = useCreatePromotionMutation();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<DataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      promotionName: promotion?.promotionName,
      description: promotion?.description,
      discountValue: promotion?.discountValue,
      // startDate: promotion?.startDate,
      // endDate: promotion?.endDate,
    },
  });

  const handleAction: SubmitHandler<DataType> = async (data) => {
    const { startDate, endDate } = data;
    const now = new Date();
    const foodIds = foods.map((food) => food.foodId);

    const createPromotion: CreatePromotionType = {
      ...data,
      startDate,
      endDate,
      isActive: now > startDate && now < endDate,
      foodIds,
    };

    try {
      let result = await useCreatePromotion(createPromotion);

      if (result) {
        navigate(location.state.redirectTo);
      }
    } catch (err: any) {
      setError("root", {
        message: err.data.message,
      });
    }
  };

  useEffect(() => {
    if (promotion) {
      setValue("promotionName", promotion.promotionName);
      setValue("description", promotion.description);
      setValue("discountValue", promotion.discountValue);
      // setValue("startDate", promotion.startDate);
      // setValue("endDate", promotion.endDate);
    }
  }, [promotion]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormContainer
      title={`${promotion ? "Akció módosítás" : "Új akció"}`}
      onSubmit={handleSubmit(handleAction)}
    >
      {errors.root && (
        <ErrorText className="text-lg text-center mt-3">
          {errors.root.message}
        </ErrorText>
      )}

      <InputText {...register("promotionName")} label="Név" />
      {errors.promotionName && (
        <ErrorText>{errors.promotionName.message}</ErrorText>
      )}

      <TextArea {...register("description")} label="Leírás" />
      {errors.description && (
        <ErrorText>{errors.description.message}</ErrorText>
      )}

      <InputText
        {...register("discountValue")}
        label="Kedvezmény (%)"
        type="number"
      />
      {errors.discountValue && (
        <ErrorText>{errors.discountValue.message}</ErrorText>
      )}

      <div className="flex justify-between items-center gap-3 mb-4">
        <div className="flex flex-col gap-4">
          <InputDate {...register("startDate")} label="Akció kezdete" />
        </div>

        <div className="flex flex-col gap-4">
          <InputDate {...register("endDate")} label="Akció vége" />
        </div>
      </div>
      <div className="w-full text-center">
        {errors.startDate && <ErrorText>{errors.startDate.message}</ErrorText>}
        {errors.endDate && <ErrorText>{errors.endDate.message}</ErrorText>}
      </div>

      {/* <div className="flex flex-col items-center justify-center">
        <InputCheckbox {...register("isActive")} label="Aktív" />
      </div> */}

      <RedirectButton
        buttonText="Étel választó"
        route="foods"
        redirectTo={location.pathname}
      />

      <p className="self-start ml-8 font-semibold -mt-2">
        Kiválasztott ételek:
      </p>
      <div className="w-5/6 border rounded-lg shadow-md h-24 overflow-auto">
        {!foods.length ? (
          <p className="flex justify-center items-center w-full h-full">
            Nincs étel kiválasztva!
          </p>
        ) : (
          <div className="w-full h-full px-4">
            {foods.map((food) => (
              <div>{food.name}</div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-10 pt-5">
        <RedirectButton buttonText="Vissza" route={location.state.redirectTo} />
        <Button variant="secondary">
          {promotion ? "Módosít" : "Létrehozás"}
        </Button>
      </div>
    </FormContainer>
  );
};

export default DashBoardPromotionForm;
