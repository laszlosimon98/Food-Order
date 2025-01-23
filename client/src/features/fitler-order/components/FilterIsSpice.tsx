import { setSpice } from "@/features/fitler-order/slice/filterOrderSlice";
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
