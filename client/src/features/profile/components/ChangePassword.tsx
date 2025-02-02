import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextInput from "@/features/shared/components/form/TextInput";
import { useChangePasswordMutation } from "@/features/user/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "A jelszónak legalább 8 karaktert kell tartalmaznia!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "A jelszónak tartalmaznia kell legalább 1 kis betűt 1 nagy betűt 1 számot 1 speciális karaktert",
    }),
  newPasswordAgain: z
    .string()
    .min(8, { message: "A jelszónak legalább 8 karaktert kell tartalmaznia!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "A jelszónak tartalmaznia kell legalább 1 kis betűt 1 nagy betűt 1 számot 1 speciális karaktert",
    }),
});

type ChangePasswordType = z.infer<typeof schema>;
type ChangePasswordProps = {
  setIsPasswordChangeFormVisible: Dispatch<SetStateAction<boolean>>;
};

const ChangePassword = ({
  setIsPasswordChangeFormVisible,
}: ChangePasswordProps): ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(schema),
  });

  const [useChangePassword] = useChangePasswordMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ChangePasswordType> = async (data) => {
    try {
      if (data.newPassword !== data.newPasswordAgain) {
        setError("root", {
          message: "A jelszavaknak meg kell egyeznie!",
        });
      }

      const { isSuccess } = await useChangePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

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
    <FormContainer title="Jelszó változtatás" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-4/5 mx-auto">
        <TextInput
          {...register("oldPassword")}
          label="Jelenlegi jelszó"
          type="password"
        />
        {errors.oldPassword && (
          <ErrorText>{errors.oldPassword.message}</ErrorText>
        )}
      </div>

      <div className="w-4/5 mx-auto">
        <TextInput
          {...register("newPassword")}
          label="Új jelszó"
          type="password"
        />
        {errors.newPassword && (
          <ErrorText>{errors.newPassword.message}</ErrorText>
        )}
      </div>

      <div className="w-4/5 mx-auto">
        <TextInput
          {...register("newPasswordAgain")}
          label="Jelszó újra"
          type="password"
        />
        {errors.newPasswordAgain && (
          <ErrorText>{errors.newPasswordAgain.message}</ErrorText>
        )}
      </div>

      <div className="flex justify-around items-center ">
        <Button
          variant="secondary"
          size="sm"
          className="mt-5"
          onClick={() => setIsPasswordChangeFormVisible(false)}
        >
          Mégse
        </Button>

        <Button variant="primary" size="default" className="mt-5" type="submit">
          Jelszó változtatás
        </Button>
      </div>
    </FormContainer>
  );
};

export default ChangePassword;
