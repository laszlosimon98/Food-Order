import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import { useDeleteOrderMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
import { OrderType } from "@/utils/types/order.type";
import { Dispatch, ReactElement, SetStateAction } from "react";

type OrderOptionButtonsProps = {
  order: OrderType;
  isQuantityEdit: boolean;
  setIsQuantityEdit: Dispatch<SetStateAction<boolean>>;
};

const OrderOptionButtons = ({
  order,
  isQuantityEdit,
  setIsQuantityEdit,
}: OrderOptionButtonsProps): ReactElement => {
  const [useDeleteOrder] = useDeleteOrderMutation();

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUserQuery();

  if (isCurrentUserLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center pt-3">
      {currentUser.userId === order.userId &&
        (!isQuantityEdit ? (
          <Button
            variant="secondary"
            onClick={() => useDeleteOrder({ id: order.orderId })}
          >
            Rendelés Törlés
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setIsQuantityEdit(false)}>
            Mégse
          </Button>
        ))}
    </div>
  );
};

export default OrderOptionButtons;
