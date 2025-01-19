import { useGetUserQuery } from "@/auth/api/authApi";
import Menu from "@/menu/components/Menu";
import { useAppDispatch, useAppSelector } from "@/storeHooks/store.hooks";
import { closeOverlay } from "features/overlay/slice/overlaySlice";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {} & PropsWithChildren;

const Layout = ({ children }: LayoutProps): ReactElement => {
  const isOverlayVisible = useAppSelector(
    (state) => state.overlay.data.isOverlayVisible
  );

  const dispatch = useAppDispatch();
  useGetUserQuery();

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
