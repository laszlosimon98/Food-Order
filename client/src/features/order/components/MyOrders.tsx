import { useGetMyOrdersQuery } from "@/features/order/api/orderApi";
import MyOrder from "@/features/order/components/MyOrder";
import Loading from "@/features/shared/components/Loading";
import PageTitle from "@/features/shared/components/PageTitle";
import { ReactElement } from "react";

const MyOrders = (): ReactElement => {
  const { data: myOrders, isLoading: isMyOrdersLoading } =
    useGetMyOrdersQuery();

  if (isMyOrdersLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>Rendeléseim</PageTitle>

      <section className="flex justify-center items-center flex-col">
        {myOrders?.map((order) => (
          <MyOrder key={order.orderId} order={order} />
        ))}
      </section>
    </>
  );
};

export default MyOrders;
