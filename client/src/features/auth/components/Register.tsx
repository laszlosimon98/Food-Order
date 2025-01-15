import Button from "@/shared/components/Button";
import FormContainer from "@/shared/components/FormContainer";
import TextInput from "@/shared/components/TextInput";
import { FormEvent, ReactElement } from "react";

const Register = (): ReactElement => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("asdf");
  };

  return (
    <FormContainer title="Regisztráció" onSubmit={onSubmit}>
      <TextInput label="Felhasználó név" />
      <TextInput label="Jelszó" type="password" />
      <div className="flex justify-center items-center ">
        <Button variant="primary" size="default">
          Regisztrálás
        </Button>
      </div>
    </FormContainer>
  );
};

export default Register;
