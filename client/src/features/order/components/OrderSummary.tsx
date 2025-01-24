import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import { clearCart } from "@/features/cart/slice/cartSlice";
import { useGetFoodsByIdsQuery } from "@/features/food/api/foodApi";
import { useAddOrderMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { CreateOrderItemType, CreateOrderType } from "@/utils/types/order.type";
import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderSummary = (): ReactElement => {
  const { cartItems } = useAppSelector((state) => state.cart.data);
  const dispatch = useAppDispatch();

  const ids: string[] = Object.keys(cartItems);

  const { data: foods, isLoading: isFoodsLoading } = useGetFoodsByIdsQuery({
    id: ids,
  });
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUserQuery();

  const [useAddOrder] = useAddOrderMutation();
  const navigate = useNavigate();

  if (isFoodsLoading || isCurrentUserLoading) {
    return <Loading />;
  }

  const handleOrder = async () => {
    if (!foods) {
      navigate("/");
      return;
    }

    const items: CreateOrderItemType[] = foods.map((food) => {
      return {
        quantity: cartItems[food.foodId].quantity,
        foodId: food.foodId,
      };
    });

    const result: CreateOrderType = {
      fullname: currentUser.fullname,
      address: currentUser.address,
      phoneNumber: currentUser.phoneNumber,
      orderItems: items,
    };

    const { isSuccess } = await useAddOrder(result).unwrap();

    if (isSuccess) {
      dispatch(clearCart());
      navigate("/");
    }
  };

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
          <div key={food.foodId}>
            {food.name} - {food.price} - Mennyiség:
            {cartItems[food.foodId] && cartItems[food.foodId].quantity}
          </div>
        ))}

      <Button onClick={handleOrder}>Rendelés leadása</Button>
    </>
  );
};

export default OrderSummary;
