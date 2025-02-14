import { PropsWithChildren, ReactElement } from "react";

type FilterCheckboxContainerProps = PropsWithChildren & {};

const FilterCheckboxContainer = ({
  children,
}: FilterCheckboxContainerProps): ReactElement => {
  return (
    <div className="flex gap-4 items-center justify-between w-64 mx-auto">
      {children}
    </div>
  );
};

export default FilterCheckboxContainer;
