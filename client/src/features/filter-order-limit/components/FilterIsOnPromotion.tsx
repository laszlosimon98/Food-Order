import { setPromotion } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterIsOnPromotion = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <>
      <label htmlFor="isOnPromotion">Akciós</label>
      <input
        type="checkbox"
        id="isOnPromotion"
        onChange={(e) => dispatch(setPromotion(e.target.checked))}
      />
    </>
  );
};

export default FilterIsOnPromotion;
