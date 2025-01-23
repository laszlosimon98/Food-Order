import { setVegetarian } from "@/features/fitler-order/slice/filterOrderSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterIsVegetarian = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <>
      <label htmlFor="isVegetarian">Vegetáriánus</label>
      <input
        type="checkbox"
        id="isVegetarian"
        onChange={(e) => dispatch(setVegetarian(e.target.checked))}
      />
    </>
  );
};

export default FilterIsVegetarian;
