import { OrderType } from "@/utils/types/order.type";
import { ReactElement, useState } from "react";
import OrderItem from "@/features/order/components/OrderItem";
import DeleteOrderButton from "@/features/order/components/ui/DeleteOrderButton";

type OrderItemsProps = {
  order: OrderType;
};

const OrderItems = ({ order }: OrderItemsProps): ReactElement => {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <>
      <h2 className="text-lg text-center mt-4 font-semibold">Tételek</h2>
      {order.orderItems.map((item) => (
        <OrderItem
          key={item.orderItemId}
          item={item}
          order={order}
          setError={setError}
        />
      ))}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <DeleteOrderButton order={order} setError={setError} />
    </>
  );
};

export default OrderItems;
