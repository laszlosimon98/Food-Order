import Button from "@/features/shared/components/Button";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type RedirectProps = {
  message: string;
  route: string;
  buttonText: string;
};

const Redirect = ({
  message,
  route,
  buttonText,
}: RedirectProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-calcScreen flex justify-center items-center flex-col gap-10">
      <h1 className="text-3xl font-semibold italic">{message}</h1>
      <Button variant="secondary" onClick={() => navigate(route)}>
        {buttonText}
      </Button>
    </div>
  );
};

export default Redirect;
