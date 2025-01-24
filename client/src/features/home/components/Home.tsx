import { closeCart } from "@/features/cart/slice/cartSlice";
import Foods from "@/features/food/components/Foods";
import { useGetMyOrdersQuery } from "@/features/order/api/orderApi";
import Loading from "@/features/shared/components/Loading";
import PageTitle from "@/features/shared/components/PageTitle";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <div className="min-h-calcScreen" onClick={() => dispatch(closeCart())}>
      <PageTitle>Ételek</PageTitle>

      <Foods />
    </div>
  );
};

export default Home;
