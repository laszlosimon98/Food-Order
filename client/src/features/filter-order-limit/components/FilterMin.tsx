import { setMinvalue } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterMin = (): ReactElement => {
  const dispatch = useAppDispatch();
  const minValue = useAppSelector((state) => state.filter.data.minValue);

  return (
    <div className="flex justify-around items-center">
      <label htmlFor="minValue">Minimum ár:</label>
      <input
        id="minValue"
        type="range"
        defaultValue={0}
        step={100}
        max={3000}
        onChange={(e) => dispatch(setMinvalue(parseInt(e.target.value)))}
      />
      <div>{minValue} Ft</div>
    </div>
  );
};

export default FilterMin;
