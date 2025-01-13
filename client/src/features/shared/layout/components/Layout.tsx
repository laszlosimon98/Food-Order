import Header from "@/header/components/Header";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {} & PropsWithChildren;

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
