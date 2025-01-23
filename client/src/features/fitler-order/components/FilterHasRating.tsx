import { setRating } from "@/features/fitler-order/slice/filterOrderSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterHasRating = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <>
      <label htmlFor="hasRating">Értékelés</label>
      <input
        type="checkbox"
        id="hasRating"
        onChange={(e) => dispatch(setRating(e.target.checked))}
      />
    </>
  );
};

export default FilterHasRating;
