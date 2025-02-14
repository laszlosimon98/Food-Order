import FilterCheckboxContainer from "@/features/filter-order-limit/components/FilterCheckboxContainer";
import { setSpice } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterIsSpice = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <FilterCheckboxContainer>
      <label htmlFor="isSpice">Erős</label>
      <input
        type="checkbox"
        id="isSpice"
        onChange={(e) => dispatch(setSpice(e.target.checked))}
      />
    </FilterCheckboxContainer>
  );
};

export default FilterIsSpice;
