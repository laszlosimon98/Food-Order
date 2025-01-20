import { useAppDispatch } from "@/storeHooks/store.hooks";
import { closeCart } from "features/cart/slice/cartSlice";
import Foods from "features/food/components/Foods";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-calcScreen" onClick={() => dispatch(closeCart())}>
      <h1 className="text-3xl font-bold text-center pt-5 mb-3 italic underline ">
        Ételek
      </h1>

      <Foods />
    </div>
  );
};

export default Home;
