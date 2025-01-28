import Button from "@/features/shared/components/Button";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

type RedirectProps = {
  message: string;
  route: string;
  buttonText: string;
  redirectTo?: string;
};

const Redirect = ({
  message,
  route,
  redirectTo,
  buttonText,
}: RedirectProps): ReactElement => {
  return (
    <div className="w-full h-calcScreen flex justify-center items-center flex-col gap-10">
      <h1 className="text-3xl font-semibold italic">{message}</h1>
      <Link to={route} state={{ redirectTo }}>
        <Button variant="secondary">{buttonText}</Button>
      </Link>
    </div>
  );
};

export default Redirect;
