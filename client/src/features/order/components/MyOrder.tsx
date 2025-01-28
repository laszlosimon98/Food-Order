import OrderItems from "@/features/order/components/OrderItems";
import Card from "@/features/shared/components/Card";
import Properties from "@/features/shared/components/Properties";
import { OrderType } from "@/utils/types/order.type";
import { ReactElement } from "react";

type MyOrderProps = {
  order: OrderType;
};

const MyOrder = ({ order }: MyOrderProps): ReactElement => {
  return (
    <Card className="p-8 md:w-[46rem]" key={order.orderId}>
      <Properties property="Név" value={order.fullname} />
      <Properties property="Cím" value={order.address} />
      <Properties property="Telefonszám" value={order.phoneNumber} />
      <Properties property="Ár" value={`${order.totalOrderPrice} Ft`} />
      <Properties
        property="Rendelés állapota"
        value={order.deliveryStatus.statusName}
      />

      <OrderItems order={order} />
    </Card>
  );
};

export default MyOrder;
