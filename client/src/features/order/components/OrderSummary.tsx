import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import { useGetFoodsByIdsQuery } from "@/features/food/api/foodApi";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const OrderSummary = (): ReactElement => {
  const { cartItems } = useAppSelector((state) => state.cart.data);
  const ids: string[] = Object.keys(cartItems);

  const { data: foods, isLoading: isFoodsLoading } = useGetFoodsByIdsQuery({
    id: ids,
  });
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUserQuery();

  if (isFoodsLoading || isCurrentUserLoading) {
    return <Loading />;
  }

  return (
    <>
      <h1>Adatok</h1>
      <div>{currentUser.address}</div>
      <div>{currentUser.phoneNumber}</div>
      <Link to={"/profile"} state={{ redirectTo: "/order-summary" }}>
        <Button>Adatok frissítése</Button>
      </Link>
      {foods &&
        foods.map((food) => (
          <div key={food.id}>
            {food.name} - {food.price} - Mennyiség:
            {cartItems[food.id].amount}
          </div>
        ))}
    </>
  );
};

export default OrderSummary;
