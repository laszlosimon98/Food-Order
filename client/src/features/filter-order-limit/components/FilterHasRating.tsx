import FilterCheckboxContainer from "@/features/filter-order-limit/components/FilterCheckboxContainer";
import { setRating } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterHasRating = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <FilterCheckboxContainer>
      <label htmlFor="hasRating">Értékelés</label>
      <input
        type="checkbox"
        id="hasRating"
        onChange={(e) => dispatch(setRating(e.target.checked))}
      />
    </FilterCheckboxContainer>
  );
};

export default FilterHasRating;
