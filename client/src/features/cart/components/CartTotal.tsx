import { useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

type CartTotalProps = {};

const CartTotal = ({}: CartTotalProps): ReactElement => {
  const { totalPrice } = useAppSelector((state) => state.cart.data);

  return (
    <div className="w-3/4 mx-auto flex justify-around items-center">
      <div className="font-bold">Összesen: </div>
      <div className="font-semibold">{totalPrice} Ft</div>
    </div>
  );
};

export default CartTotal;
