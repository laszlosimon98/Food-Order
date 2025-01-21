import Menu from "@/features/menu/components/Menu";
import Overlay from "@/features/overlay/components/Overlay";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {} & PropsWithChildren;

const Layout = ({ children }: LayoutProps): ReactElement => {
  const { isMenuOverlayOpen, isFoodOverlayOpen } = useAppSelector(
    (state) => state.overlay.data
  );

  return (
    <>
      {(isMenuOverlayOpen || isFoodOverlayOpen) && <Overlay />}

      <Menu />
      <div className="w-full bg-background">{children}</div>
    </>
  );
};

export default Layout;
