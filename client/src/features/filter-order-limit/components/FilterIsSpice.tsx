import { setSpice } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterIsSpice = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <>
      <label htmlFor="isSpice">Erős</label>
      <input
        type="checkbox"
        id="isSpice"
        onChange={(e) => dispatch(setSpice(e.target.checked))}
      />
    </>
  );
};

export default FilterIsSpice;
