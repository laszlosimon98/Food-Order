import OrderFoodSection from "@/features/order/components/OrderFoodSection";
import OrderFoodSectionContainer from "@/features/order/components/OrderFoodSectionContainer";
import OrderButtonsContainer from "@/features/order/components/ui/OrderButtonsContainer";
import { OrderItemType } from "@/utils/types/order-item.type";
import { OrderType } from "@/utils/types/order.type";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import EditOrderItemButton from "@/features/order/components/ui/EditOrderItemButton";
import DeleteOrderItemButton from "@/features/order/components/ui/DeleteOrderItemButton";

type OrderItemProps = {
  item: OrderItemType;
  order: OrderType;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

const OrderItem = ({ item, order, setError }: OrderItemProps): ReactElement => {
  const [isQuantityEdit, setIsQuantityEdit] = useState<boolean>(false);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  return (
    <OrderFoodSectionContainer key={item.orderItemId}>
      <OrderFoodSection
        item={item}
        isQuantityEdit={isQuantityEdit}
        setNewQuantity={setNewQuantity}
      />

      <OrderButtonsContainer>
        <EditOrderItemButton
          item={item}
          newQuantity={newQuantity}
          isQuantityEdit={isQuantityEdit}
          setIsQuantityEdit={setIsQuantityEdit}
          order={order}
          setError={setError}
        />

        {!isQuantityEdit && (
          <DeleteOrderItemButton
            item={item}
            order={order}
            setError={setError}
          />
        )}
      </OrderButtonsContainer>
    </OrderFoodSectionContainer>
  );
};

export default OrderItem;
