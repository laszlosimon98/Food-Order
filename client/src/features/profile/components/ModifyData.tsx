import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextInput from "@/features/shared/components/form/TextInput";
import { useUpdateUserDetailsMutation } from "@/features/user/api/userApi";
import { UserType } from "@/utils/types/user.type";
import { getDefaultAddress } from "@/utils/userData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

type ModifyDataProps = {
  currentUser: UserType;
};

const schema = z
  .object({
    fullname: z.string(),
    phoneNumber: z.string(),
    zipCode: z
      .string()
      .refine((value) => value.length === 0 || value.length === 4, {
        message: "Az irányítószámnak pontosan 4 számból kell állnia!",
      }),
    city: z.string(),
    street: z.string(),
    houseNumber: z.string(),
  })
  .refine(
    (data) => {
      const { fullname, phoneNumber, ...rest } = data;
      const isAnyFieldFilled = Object.values(rest).some(
        (value) => value.length !== 0
      );

      const isAllFieldFilled = Object.values(rest).every(
        (value) => value.length > 0
      );

      if (!isAnyFieldFilled) {
        return true;
      }

      return isAllFieldFilled;
    },
    {
      message: "A irányítószám, város, utca, házszám mezők kitöltése kötelező!",
      path: ["zipCode"],
    }
  );

type ModifyDataType = z.infer<typeof schema>;

export type AddressType = { [key: string]: string } & Omit<
  Omit<ModifyDataType, "fullname">,
  "phoneNumber"
>;

const ModifyData = ({ currentUser }: ModifyDataProps): ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ModifyDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: currentUser.fullname,
      zipCode: getDefaultAddress(currentUser, "zipCode"),
      city: getDefaultAddress(currentUser, "city"),
      street: getDefaultAddress(currentUser, "street"),
      houseNumber: getDefaultAddress(currentUser, "houseNumber"),
      phoneNumber: currentUser.phoneNumber ? currentUser.phoneNumber : "",
    },
  });

  const [useUpdateUserDetails] = useUpdateUserDetailsMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<ModifyDataType> = async (data) => {
    try {
      let copyData: Partial<typeof data> & {
        [key: string]: string;
      } = {
        ...data,
      };

      Object.entries(copyData).forEach((entry) => {
        const [key, value] = entry;
        if (value.length === 0) {
          delete copyData[key];
        }
      });

      let result = copyData;
      const { zipCode } = result;

      if (zipCode) {
        const { zipCode, city, street, houseNumber, ...rest } = result;
        const address = `${zipCode}, ${city} ${street} ${houseNumber}`;

        result = {
          address: address,
          ...rest,
        };
      }

      const { data: updatedData } = await useUpdateUserDetails({ ...result });

      if (updatedData) {
        if (location.state) {
          navigate(location.state.redirectTo);
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      setError("root", {
        message: err.data.message,
      });
    }
  };

  return (
    <FormContainer title="Adataim" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <ErrorText className="text-lg text-center mt-3">
          {errors.root.message}
        </ErrorText>
      )}

      <div className="w-4/5 mx-auto">
        <TextInput {...register("fullname")} label="Teljes név" />
        {errors.fullname && <ErrorText>{errors.fullname.message}</ErrorText>}

        <TextInput
          {...register("zipCode")}
          label="Irányítószám"
          type="number"
        />
        {errors.zipCode && <ErrorText>{errors.zipCode.message}</ErrorText>}

        <TextInput {...register("city")} label="Város" type="text" />
        {errors.city && <ErrorText>{errors.city.message}</ErrorText>}

        <TextInput {...register("street")} label="Utca" type="text" />
        {errors.street && <ErrorText>{errors.street.message}</ErrorText>}

        <TextInput {...register("houseNumber")} label="Házszám" type="number" />
        {errors.houseNumber && (
          <ErrorText>{errors.houseNumber.message}</ErrorText>
        )}

        <TextInput
          {...register("phoneNumber")}
          label="Telefonszám"
          placeholder="06-30-123-4567"
        />
        {errors.phoneNumber && (
          <ErrorText>{errors.phoneNumber.message}</ErrorText>
        )}
      </div>

      <div className="flex justify-center items-center ">
        <Button variant="primary" size="default" className="mt-5">
          Adataim módosítása
        </Button>
      </div>
    </FormContainer>
  );
};

export default ModifyData;
