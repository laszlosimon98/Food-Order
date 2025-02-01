import { useDeleteOrderMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { OrderType } from "@/utils/types/order.type";
import { Dispatch, ReactElement, SetStateAction } from "react";

type DeleteOrderButtonProps = {
  order: OrderType;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

const DeleteOrderButton = ({
  order,
  setError,
}: DeleteOrderButtonProps): ReactElement => {
  const [useDeleteOrder] = useDeleteOrderMutation();
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);

  const handleDelete = async () => {
    const result = await useDeleteOrder({ id: order.orderId });

    if (result.error) {
      setError(result.error.data.message);
    }
  };

  return (
    <div className="flex justify-center pt-3">
      {currentUser && currentUser.userId === order.userId && (
        <Button variant="secondary" onClick={handleDelete}>
          Rendelés Törlés
        </Button>
      )}
    </div>
  );
};

export default DeleteOrderButton;
