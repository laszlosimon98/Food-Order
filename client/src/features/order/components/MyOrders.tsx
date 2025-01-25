import { useGetMyOrdersQuery } from "@/features/order/api/orderApi";
import OrderItems from "@/features/order/components/OrderItems";
import Properties from "@/features/shared/components/Properties";
import Card from "@/features/shared/components/Card";
import Loading from "@/features/shared/components/Loading";
import PageTitle from "@/features/shared/components/PageTitle";
import { ReactElement, useState } from "react";
import OrderOptionButtons from "@/features/order/components/OrderOptionButtonsContainer";

const MyOrders = (): ReactElement => {
  const { data: myOrders, isLoading: isMyOrdersLoading } =
    useGetMyOrdersQuery();

  const [isQuantityEdit, setIsQuantityEdit] = useState<boolean>(false);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  if (isMyOrdersLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>Rendeléseim</PageTitle>

      <section className="flex justify-center items-center flex-col">
        {myOrders?.map((order) => (
          <Card className="p-8 md:w-[46rem]" key={order.orderId}>
            <Properties property="Név" value={order.fullname} />
            <Properties property="Cím" value={order.address} />
            <Properties property="Telefonszám" value={order.phoneNumber} />
            <Properties property="Ár" value={`${order.totalOrderPrice} Ft`} />
            <Properties
              property="Rendelés állapota"
              value={order.deliveryStatus.statusName}
            />

            <OrderItems
              order={order}
              isQuantityEdit={isQuantityEdit}
              newQuantity={newQuantity}
              setIsQuantityEdit={setIsQuantityEdit}
              setNewQuantity={setNewQuantity}
            />

            <OrderOptionButtons
              order={order}
              isQuantityEdit={isQuantityEdit}
              setIsQuantityEdit={setIsQuantityEdit}
            />
          </Card>
        ))}
      </section>
    </>
  );
};

export default MyOrders;
