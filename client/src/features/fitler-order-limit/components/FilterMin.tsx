import { setMinvalue } from "@/features/fitler-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterMin = (): ReactElement => {
  const dispatch = useAppDispatch();
  const minValue = useAppSelector((state) => state.filter.data.minValue);

  return (
    <div className="flex w-36 flex-col">
      <label htmlFor="minValue">Minimum ár: {minValue}</label>
      <input
        id="minValue"
        type="range"
        defaultValue={0}
        step={100}
        max={3000}
        onChange={(e) => dispatch(setMinvalue(parseInt(e.target.value)))}
      />
    </div>
  );
};

export default FilterMin;
