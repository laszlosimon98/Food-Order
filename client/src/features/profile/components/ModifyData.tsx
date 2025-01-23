import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextInput from "@/features/shared/components/TextInput";
import { useUpdateUserDetailsMutation } from "@/features/user/api/userApi";
import { UserType } from "@/utils/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { current } from "@reduxjs/toolkit";
import { ReactElement, useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type ModifyDataProps = {
  currentUser: UserType;
};

// Legyen egyszerűbb, amikor a profilomra nyomok, akkor kiadja az bejelentkezett felhasználó adatait
// és lesznek gombok, hogy mit akarok csinálni, pl név változatás, cim megadás, telefonszám megadás, jelszó változtatás
// és amit választok az alapján fog megjelenni, a form

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
type AddressType = { [key: string]: string } & Omit<
  Omit<ModifyDataType, "fullname">,
  "phoneNumber"
>;

const ModifyData = ({ currentUser }: ModifyDataProps): ReactElement => {
  const getDefaultAddress = (key: string): string => {
    if (currentUser.address) {
      const address = currentUser.address.replace(",", "").split(" ");

      const result: AddressType = {
        zipCode: address[0],
        city: address[1],
        street: "".concat(address[2], " ", address[3], " ", address[4]),
        houseNumber: address[5],
      };

      return result[key];
    }

    return "";
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ModifyDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: currentUser.fullname,
      zipCode: getDefaultAddress("zipCode"),
      city: getDefaultAddress("city"),
      street: getDefaultAddress("street"),
      houseNumber: getDefaultAddress("houseNumber"),
      phoneNumber: currentUser.phoneNumber ? currentUser.phoneNumber : "",
    },
  });

  const [useUpdateUserDetails] = useUpdateUserDetailsMutation();
  const navigate = useNavigate();

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

      const { isSuccess } = await useUpdateUserDetails({ ...result }).unwrap();
      if (isSuccess) {
        navigate("/");
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
        <Button variant="primary" size="default" className="mt-5" type="submit">
          Adataim módosítása
        </Button>
      </div>
    </FormContainer>
  );
};

export default ModifyData;
