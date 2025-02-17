import { useRegisterMutation } from "@/features/auth/api/authApi";
import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import InputText from "@/features/shared/components/form/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
  fullname: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
  password: z
    .string()
    .min(8, { message: "A jelszónak legalább 8 karaktert kell tartalmaznia!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "A jelszónak tartalmaznia kell legalább 1 kis betűt 1 nagy betűt 1 számot 1 speciális karaktert",
    }),
  passwordAgain: z
    .string()
    .min(8, { message: "A jelszónak legalább 8 karaktert kell tartalmaznia!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "A jelszónak tartalmaznia kell legalább 1 kis betűt 1 nagy betűt 1 számot 1 speciális karaktert",
    }),
});

export type RegisterType = z.infer<typeof schema>;

const Register = (): ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [useRegister] = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    try {
      if (data.password !== data.passwordAgain) {
        setError("root", {
          message: "A jelszavaknak meg kell egyeznie!",
        });
      }

      const { isSuccess } = await useRegister(data).unwrap();

      if (isSuccess) {
        navigate("/login");
      }
    } catch (err: any) {
      setError("root", {
        message: err.data.message,
      });
    }
  };

  return (
    <FormContainer
      className="h-calcScreen flex justify-center items-center"
      title="Regisztráció"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.root && (
        <ErrorText>
          <div className="text-lg text-center mt-3">{errors.root.message} </div>
        </ErrorText>
      )}

      <InputText {...register("username")} label="Felhasználó név" />
      {errors.username && <ErrorText>{errors.username.message}</ErrorText>}

      <InputText {...register("fullname")} label="Teljes név" />
      {errors.fullname && <ErrorText>{errors.fullname.message}</ErrorText>}

      <InputText
        {...register("password")}
        label="Jelszó Újra"
        type="password"
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <InputText
        {...register("passwordAgain")}
        label="Jelszó"
        type="password"
      />
      {errors.passwordAgain && (
        <ErrorText>{errors.passwordAgain.message}</ErrorText>
      )}

      <Button variant="primary" size="default">
        Regisztrálás
      </Button>
    </FormContainer>
  );
};

export default Register;
