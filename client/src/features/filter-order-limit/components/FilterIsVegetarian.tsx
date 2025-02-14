import FilterCheckboxContainer from "@/features/filter-order-limit/components/FilterCheckboxContainer";
import { setVegetarian } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterIsVegetarian = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <FilterCheckboxContainer>
      <label htmlFor="isVegetarian">Vegetáriánus</label>
      <input
        type="checkbox"
        id="isVegetarian"
        onChange={(e) => dispatch(setVegetarian(e.target.checked))}
      />
    </FilterCheckboxContainer>
  );
};

export default FilterIsVegetarian;
