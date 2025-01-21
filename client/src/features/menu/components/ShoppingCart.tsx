import CartItemCounter from "@/features/cart/components/CartItemCounter";
import { toogleCart } from "@/features/cart/slice/cartSlice";
import Icon from "@/features/shared/components/Icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

type ShoppingCartProps = {};

const ShoppingCart = ({}: ShoppingCartProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector((state) => state.cart.data);

  return (
    <Icon
      icon={faCartShopping}
      size="2x"
      onClick={() => dispatch(toogleCart())}
    >
      {totalItems > 0 && <CartItemCounter>{totalItems}</CartItemCounter>}
    </Icon>
  );
};

export default ShoppingCart;
