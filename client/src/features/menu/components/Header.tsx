import { closeCart } from "@/features/cart/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { PropsWithChildren, ReactElement } from "react";

type HeaderProps = PropsWithChildren & {};

const Header = ({ children }: HeaderProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { isCartVisible } = useAppSelector((state) => state.cart.data);

  return (
    <header
      className="top-0 h-20 w-full flex flex-row justify-between bg-background items-center px-10 z-20"
      onClick={() => {
        if (isCartVisible) {
          dispatch(closeCart());
        }
      }}
    >
      {children}
    </header>
  );
};

export default Header;
