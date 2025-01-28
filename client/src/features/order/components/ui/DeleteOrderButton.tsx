import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import { useDeleteOrderMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
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

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUserQuery();

  const handleDelete = async () => {
    const result = await useDeleteOrder({ id: order.orderId });

    if (result.error) {
      setError(result.error.data.message);
    }
  };

  if (isCurrentUserLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center pt-3">
      {currentUser.userId === order.userId && (
        <Button variant="secondary" onClick={handleDelete}>
          Rendelés Törlés
        </Button>
      )}
    </div>
  );
};

export default DeleteOrderButton;
