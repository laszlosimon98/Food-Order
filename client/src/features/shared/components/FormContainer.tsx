import { PropsWithChildren, ReactElement } from "react";

type FormContainerProps = PropsWithChildren & {
  title: string;
  onSubmit: (e: any) => void;
};

const FormContainer = ({
  title,
  onSubmit,
  children,
}: FormContainerProps): ReactElement => {
  return (
    <div className="h-full flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <div className=" w-formContainer shadow-2xl rounded-3xl p-5 bg-white">
          <h1 className="text-center text-3xl font-bold py-2 italic underline text-baseColor">
            {title}
          </h1>
          {children}
        </div>
      </form>
    </div>
  );
};

export default FormContainer;
