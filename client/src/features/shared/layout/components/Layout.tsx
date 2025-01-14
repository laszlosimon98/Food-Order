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
          className="absolute top-0 left-0 bg-black bg-opacity-50 inset-0"
          onClick={() => dispatch(close())}
        ></div>
      )}
      <Menu />
      {children}
    </>
  );
};

export default Layout;
