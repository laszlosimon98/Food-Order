import Button from "@/features/shared/components/Button";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

type RedirectButtonProps = {
  route: string;
  buttonText: string;
  redirectTo?: string;
};

const RedirectButton = ({
  route,
  redirectTo,
  buttonText,
}: RedirectButtonProps): ReactElement => {
  return (
    <Link to={route} state={{ redirectTo }}>
      <Button variant="secondary">{buttonText}</Button>
    </Link>
  );
};

export default RedirectButton;
