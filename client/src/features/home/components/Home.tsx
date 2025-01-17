import { useAppSelector } from "@/storeHooks/store.hooks";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  const accessToken = useAppSelector((state) => state.auth.data.accessToken);
  return (
    <>
      <h1>{accessToken ? "Bejelentkezve" : "Kijelentkezve"}</h1>
    </>
  );
};

export default Home;
