import OrderInput from "@/features/order/components/ui/OrderInput";
import { OrderItemType } from "@/utils/types/order-item.type";
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from "react";

type OrderFoodSectionProps = {
  item: OrderItemType;
  isQuantityEdit: boolean;
  setNewQuantity: Dispatch<SetStateAction<number>>;
};

const OrderFoodSection = ({
  item,
  isQuantityEdit,
  setNewQuantity,
}: OrderFoodSectionProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    if (num > 0) {
      setNewQuantity(num);
    }
  };

  return (
    <section className="w-full flex flex-1 flex-col">
      <div>Étel: {item.foods.name}</div>
      <div className="flex justify-start gap-2">
        <div>Mennyiség:</div>
        <div>
          {!isQuantityEdit ? (
            item.quantity
          ) : (
            <OrderInput
              value={item.quantity}
              onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
            />
          )}
        </div>
      </div>
      <div className="pr-5">Ár: {item.totalPrice} Ft</div>
    </section>
  );
};

export default OrderFoodSection;
