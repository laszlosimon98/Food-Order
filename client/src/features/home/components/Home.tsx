import Foods from "@/features/food/components/Foods";
import PageTitle from "@/features/shared/components/PageTitle";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  return (
    <>
      <PageTitle>Ételek</PageTitle>

      <Foods />
    </>
  );
};

export default Home;
