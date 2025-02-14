import { setMaxValue } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterMax = (): ReactElement => {
  const dispatch = useAppDispatch();
  const maxValue = useAppSelector((state) => state.filter.data.maxValue);

  return (
    <div className="flex justify-around items-center">
      <label htmlFor="maxValue">Maximum ár:</label>
      <input
        id="maxValue"
        type="range"
        defaultValue={3000}
        step={100}
        max={3000}
        onChange={(e) => dispatch(setMaxValue(parseInt(e.target.value)))}
      />
      <span>{maxValue} Ft</span>
    </div>
  );
};

export default FilterMax;
