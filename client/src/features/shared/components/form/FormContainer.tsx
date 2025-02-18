import FormHeader from "@/features/shared/components/form/FormHeader";
import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type FormContainerProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    title: string;
    onSubmit: (e: any) => void;
  };

const FormContainer = ({
  title,
  onSubmit,
  children,
  className,
}: FormContainerProps): ReactElement => {
  return (
    <div className={cn("flex justify-center md:items-center", className)}>
      <form onSubmit={onSubmit}>
        <div className="w-formContainer shadow-2xl rounded-3xl p-5 bg-white flex flex-col gap-3 justify-center items-center">
          <FormHeader title={title} />

          {children}
        </div>
      </form>
    </div>
  );
};

export default FormContainer;
