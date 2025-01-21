import { PropsWithChildren, ReactElement } from "react";

type HomeTitleProps = PropsWithChildren & {};

const HomeTitle = ({ children }: HomeTitleProps): ReactElement => {
  return (
    <h1 className="text-3xl font-bold text-center pt-5 mb-3 italic underline ">
      {children}
    </h1>
  );
};

export default HomeTitle;
