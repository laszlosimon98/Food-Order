import { useDeleteOrderItemMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import { OrderItemType } from "@/utils/types/order-item.type";
import { OrderType } from "@/utils/types/order.type";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, ReactElement, SetStateAction } from "react";

type DeleteOrderItemButtonProps = {
  item: OrderItemType;
  order: OrderType;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

const DeleteOrderItemButton = ({
  item,
  order,
  setError,
}: DeleteOrderItemButtonProps): ReactElement => {
  const [useDeleteOrderItem] = useDeleteOrderItemMutation();

  const handleDelete = async () => {
    const result = await useDeleteOrderItem({
      id: item.orderItemId,
      orderId: order.orderId,
    });

    if (result.error) {
      setError(result.error.data.message);
    }
  };

  return (
    <Button variant="secondary" size="icon" onClick={handleDelete}>
      <FontAwesomeIcon icon={faClose} />
    </Button>
  );
};

export default DeleteOrderItemButton;
