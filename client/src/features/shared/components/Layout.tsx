import { closeCart } from "@/features/cart/slice/cartSlice";
import Menu from "@/features/menu/components/Menu";
import Overlay from "@/features/overlay/components/Overlay";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {} & PropsWithChildren;

const Layout = ({ children }: LayoutProps): ReactElement => {
  const { isMenuOverlayOpen, isFoodOverlayOpen } = useAppSelector(
    (state) => state.overlay.data
  );

  const dispatch = useAppDispatch();

  return (
    <>
      {(isMenuOverlayOpen || isFoodOverlayOpen) && <Overlay />}

      <Menu />
      <div
        className="w-full min-h-screen bg-background"
        onClick={() => dispatch(closeCart())}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
