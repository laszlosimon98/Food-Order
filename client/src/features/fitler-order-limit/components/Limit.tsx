import { setLimit } from "@/features/fitler-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ChangeEvent, ReactElement } from "react";

const Limit = (): ReactElement => {
  const dispatch = useAppDispatch();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value) {
      dispatch(setLimit());
      return;
    }

    dispatch(setLimit(parseInt(value)));
  };

  return (
    <div>
      <h2>Limit</h2>
      <select onChange={handleSelect}>
        <option value=""></option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default Limit;
