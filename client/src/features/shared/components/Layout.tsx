import Menu from "@/menu/components/Menu";
import { useAppDispatch, useAppSelector } from "@/storeHooks/store.hooks";
import { close } from "features/overlay/slice/overlaySlice";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {} & PropsWithChildren;

const Layout = ({ children }: LayoutProps): ReactElement => {
  const isOverlayVisible = useAppSelector(
    (state) => state.overlay.isOverlayVisible
  );

  const dispatch = useAppDispatch();

  return (
    <>
      {isOverlayVisible && (
        <div
          className="absolute bg-black bg-opacity-50 inset-0"
          onClick={() => dispatch(close())}
        ></div>
      )}
      <Menu />

      <div className="w-full h-screen">{children}</div>
    </>
  );
};

export default Layout;
