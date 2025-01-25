import OrderButtonsContainer from "@/features/order/components/OrderButtonsContainer";
import OrderDeleteButton from "@/features/order/components/OrderDeleteButton";
import OrderEditButton from "@/features/order/components/OrderEditButton";
import OrderFoodSection from "@/features/order/components/OrderFoodSection";
import OrderFoodSectionContainer from "@/features/order/components/OrderFoodSectionContainer";
import { OrderType } from "@/utils/types/order.type";
import { Dispatch, ReactElement, SetStateAction } from "react";

type OrderItemsProps = {
  order: OrderType;
  isQuantityEdit: boolean;
  newQuantity: number;
  setNewQuantity: Dispatch<SetStateAction<number>>;
  setIsQuantityEdit: Dispatch<SetStateAction<boolean>>;
};

const OrderItems = ({
  order,
  isQuantityEdit,
  newQuantity,
  setNewQuantity,
  setIsQuantityEdit,
}: OrderItemsProps): ReactElement => {
  return (
    <>
      <h2 className="text-lg text-center mt-4 font-semibold">Tételek</h2>
      {order.orderItems.map((item) => (
        <OrderFoodSectionContainer key={item.orderItemId}>
          <OrderFoodSection
            item={item}
            isQuantityEdit={isQuantityEdit}
            setNewQuantity={setNewQuantity}
          />

          <OrderButtonsContainer>
            <OrderEditButton
              item={item}
              newQuantity={newQuantity}
              isQuantityEdit={isQuantityEdit}
              setIsQuantityEdit={setIsQuantityEdit}
              order={order}
            />

            {!isQuantityEdit && <OrderDeleteButton item={item} order={order} />}
          </OrderButtonsContainer>
        </OrderFoodSectionContainer>
      ))}{" "}
    </>
  );
};

export default OrderItems;
