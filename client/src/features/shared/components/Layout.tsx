import Menu from "@/features/menu/components/Menu";
import { closeOverlay } from "@/features/overlay/slice/overlaySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {} & PropsWithChildren;

const Layout = ({ children }: LayoutProps): ReactElement => {
  const { isOverlayVisible } = useAppSelector((state) => state.overlay.data);

  const dispatch = useAppDispatch();

  return (
    <>
      {isOverlayVisible && (
        <div
          className="absolute bg-black bg-opacity-80 inset-0"
          onClick={() => dispatch(closeOverlay())}
        ></div>
      )}
      <Menu />

      <div className="w-full bg-background">{children}</div>
    </>
  );
};

export default Layout;
