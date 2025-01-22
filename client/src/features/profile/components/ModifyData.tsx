import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextInput from "@/features/shared/components/TextInput";
import { useUpdateUserDetailsMutation } from "@/features/user/api/userApi";
import { UserType } from "@/utils/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type ModifyDataProps = {
  currentUser: UserType;
};

const schema = z.object({
  fullname: z.string(),
  phoneNumber: z.string(),
  // address: z.string(),
  zipCode: z
    .string()
    .min(4, { message: "Az irányítószámnak pontosan 4 számból kell állnia!" })
    .max(4, { message: "Az irányítószámnak pontosan 4 számból kell állnia!" }),
});

type ModifyDataType = z.infer<typeof schema>;

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
      // address: currentUser.address ? currentUser.address : "",
      phoneNumber: currentUser.phoneNumber ? currentUser.phoneNumber : "",
    },
  });

  const [useUpdateUserDetails] = useUpdateUserDetailsMutation();

  const onSubmit: SubmitHandler<ModifyDataType> = async (data) => {
    console.log(data);
    // try {
    //   let copyData: Partial<typeof data> & {
    //     [key: string]: string;
    //   } = {
    //     ...data,
    //   };

    //   Object.entries(copyData).forEach((entry) => {
    //     const [key, value] = entry;
    //     if (value.length === 0) {
    //       delete copyData[key];
    //     }
    //   });

    //   const result: Partial<typeof data> = copyData;

    //   const {isSuccess} = await useUpdateUserDetails({ ...result }).unwrap();
    // if (isSuccess) {
    //   navigate("/profile");
    // }
    // } catch (err: any) {
    //   setError("root", {
    //     message: err.data.message,
    //   });
    // }
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
      </div>

      <div className="w-4/5 mx-auto">
        <TextInput {...register("zipCode")} label="Cím" type="number" />
        {errors.zipCode && <ErrorText>{errors.zipCode.message}</ErrorText>}
      </div>

      <div className="w-4/5 mx-auto">
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
