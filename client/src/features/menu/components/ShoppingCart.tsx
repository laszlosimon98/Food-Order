import CartItemCounter from "@/features/cart/components/CartItemCounter";
import { toogleCart } from "@/features/cart/slice/cartSlice";
import Icon from "@/features/shared/components/Icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren, ReactElement } from "react";

type ShoppingCartProps = PropsWithChildren & {};

const ShoppingCart = ({ children }: ShoppingCartProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector((state) => state.cart.data);

  return (
    <Icon
      icon={faCartShopping}
      size="xl"
      onClick={() => dispatch(toogleCart())}
      className="hidden md:block"
    >
      <>
        {children}
        {totalItems > 0 && <CartItemCounter>{totalItems}</CartItemCounter>}
      </>
    </Icon>
  );
};

export default ShoppingCart;
