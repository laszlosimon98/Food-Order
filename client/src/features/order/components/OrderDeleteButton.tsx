import { useDeleteOrderItemMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import { OrderItemType } from "@/utils/types/order-item.type";
import { OrderType } from "@/utils/types/order.type";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

type OrderDeleteButtonProps = {
  item: OrderItemType;
  order: OrderType;
};

const OrderDeleteButton = ({
  item,
  order,
}: OrderDeleteButtonProps): ReactElement => {
  const [useDeleteOrderItem] = useDeleteOrderItemMutation();

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() =>
        useDeleteOrderItem({
          id: item.orderItemId,
          orderId: order.orderId,
        })
      }
    >
      <FontAwesomeIcon icon={faClose} />
    </Button>
  );
};

export default OrderDeleteButton;
