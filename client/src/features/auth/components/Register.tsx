import { useRegisterMutation } from "@/features/auth/api/authApi";
import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/form/ErrorText";
import FormContainer from "@/features/shared/components/form/FormContainer";
import TextInput from "@/features/shared/components/TextInput";
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
    <FormContainer title="Regisztráció" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <ErrorText>
          <div className="text-lg text-center mt-3">{errors.root.message} </div>
        </ErrorText>
      )}

      <TextInput {...register("username")} label="Felhasználó név" />
      {errors.username && <ErrorText>{errors.username.message}</ErrorText>}

      <TextInput {...register("fullname")} label="Teljes név" />
      {errors.fullname && <ErrorText>{errors.fullname.message}</ErrorText>}

      <TextInput
        {...register("password")}
        label="Jelszó Újra"
        type="password"
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <TextInput
        {...register("passwordAgain")}
        label="Jelszó"
        type="password"
      />
      {errors.passwordAgain && (
        <ErrorText>{errors.passwordAgain.message}</ErrorText>
      )}

      <div className="flex justify-center items-center ">
        <Button variant="primary" size="default" className="mt-5" type="submit">
          Regisztrálás
        </Button>
      </div>
    </FormContainer>
  );
};

export default Register;
