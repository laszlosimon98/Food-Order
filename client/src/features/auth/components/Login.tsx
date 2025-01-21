import { useLoginMutation } from "@/features/auth/api/authApi";
import { saveToken } from "@/features/auth/slice/authSlice";
import Button from "@/features/shared/components/Button";
import ErrorText from "@/features/shared/components/ErrorText";
import FormContainer from "@/features/shared/components/FormContainer";
import TextInput from "@/features/shared/components/TextInput";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
  password: z.string().min(1, { message: "A mező kitöltése kötelező!" }),
});

export type LoginType = z.infer<typeof schema>;

const Login = (): ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [useLogin] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      const accessToken = await useLogin(data).unwrap();
      dispatch(saveToken(accessToken));

      if (accessToken) {
        navigate("/");
      }
    } catch (err: any) {
      setError("root", {
        message: err.data.message,
      });
    }
  };

  return (
    <div className="h-calcScreen">
      <FormContainer title="Bejelentkezés" onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <ErrorText>
            <div className="text-lg text-center mt-3">
              {errors.root.message}{" "}
            </div>
          </ErrorText>
        )}

        <div className="w-2/3 mx-auto">
          <TextInput {...register("username")} label="Felhasználó név" />
          {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
        </div>
        <div className="w-2/3 mx-auto">
          <TextInput {...register("password")} label="Jelszó" type="password" />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>

        <div className="flex justify-center items-center ">
          <Button variant="primary" size="default" className="mt-5">
            Bejelentkezés
          </Button>
        </div>
      </FormContainer>
    </div>
  );
};

export default Login;
