import {
  setOrderByPrice,
  setOrderByRating,
  setOrderToDefault,
} from "@/features/fitler-order/slice/filterOrderSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ChangeEvent, ReactElement } from "react";

const OrderItems = (): ReactElement => {
  const dispatch = useAppDispatch();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      dispatch(setOrderToDefault());
      return;
    }

    const [target, order] = e.target.value.split(" ") as [
      string,
      "asc" | "desc"
    ];

    if (target === "price") {
      dispatch(setOrderByPrice(order));
    } else {
      dispatch(setOrderByRating(order));
    }
  };

  return (
    <select onChange={handleSelect}>
      <option value=""></option>
      <option value="price asc">Ár szerint növekvő</option>
      <option value="price desc">Ár szerint csökkenő</option>
      <option value="rating asc">Értékelés szerint növekvő</option>
      <option value="rating desc">Értékelés szerint csökkenő</option>
    </select>
  );
};

export default OrderItems;
