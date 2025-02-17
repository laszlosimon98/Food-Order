import { setLimit } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import Select from "@/features/shared/components/form/Select";
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
    <Select label="Limit" onChange={handleSelect} className="justify-around">
      <option value=""></option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </Select>
  );
};

export default Limit;
