import Button from "@/features/shared/components/Button";
import { HTMLAttributes, ReactElement } from "react";
import { Link } from "react-router-dom";

type RedirectButtonProps = HTMLAttributes<HTMLButtonElement> & {
  route: string;
  buttonText: string;
  redirectTo?: string;
};

const RedirectButton = ({
  route,
  redirectTo,
  buttonText,
  ...props
}: RedirectButtonProps): ReactElement => {
  return (
    <Link to={route} state={{ redirectTo }}>
      <Button variant="secondary" {...props}>
        {buttonText}
      </Button>
    </Link>
  );
};

export default RedirectButton;
