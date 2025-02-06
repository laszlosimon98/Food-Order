import RedirectButton from "@/features/shared/components/RedirectButton";
import { ReactElement } from "react";

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
      <RedirectButton
        buttonText={buttonText}
        route={route}
        redirectTo={redirectTo}
      />
    </div>
  );
};

export default Redirect;
