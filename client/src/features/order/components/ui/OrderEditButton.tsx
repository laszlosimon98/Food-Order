import { useUpdateOrderItemMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import { OrderItemType } from "@/utils/types/order-item.type";
import { OrderType } from "@/utils/types/order.type";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, ReactElement, SetStateAction } from "react";

type OrderEditButtonProps = {
  item: OrderItemType;
  isQuantityEdit: boolean;
  newQuantity: number;
  order: OrderType;
  setIsQuantityEdit: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

const OrderEditButton = ({
  item,
  isQuantityEdit,
  newQuantity,
  order,
  setIsQuantityEdit,
  setError,
}: OrderEditButtonProps): ReactElement => {
  const [useUpdateOrderItem] = useUpdateOrderItemMutation();

  const handleEdit = async () => {
    const result = await useUpdateOrderItem({
      id: item.orderItemId,
      quantity: newQuantity,
      orderId: order.orderId,
    });

    if (result.error) {
      setError(result.error.data.message);
    }
  };

  return (
    <Button
      variant="secondary"
      size={`${!isQuantityEdit ? "icon" : "default"}`}
      onClick={() => {
        if (!isQuantityEdit) {
          setIsQuantityEdit(true);
        } else {
          handleEdit();
          setIsQuantityEdit(false);
        }
      }}
    >
      {!isQuantityEdit ? <FontAwesomeIcon icon={faEdit} /> : "Módosítás"}
    </Button>
  );
};

export default OrderEditButton;
