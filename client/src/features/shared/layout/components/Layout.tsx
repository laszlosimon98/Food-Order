import Menu from "features/menu/components/Menu";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {} & PropsWithChildren;

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default Layout;
