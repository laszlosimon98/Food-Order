import { closeCart } from "@/features/cart/slice/cartSlice";
import Menu from "@/features/menu/components/Menu";
import Overlay from "@/features/overlay/components/Overlay";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const Layout = (): ReactElement => {
  const { isMenuOverlayOpen } = useAppSelector((state) => state.overlay.data);
  const dispatch = useAppDispatch();

  return (
    <>
      {isMenuOverlayOpen && <Overlay />}

      <Menu />
      <div
        className="w-full min-h-calcScreen bg-background"
        onClick={() => dispatch(closeCart())}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
