import { clearCart } from "@/features/cart/slice/cartSlice";
import { useGetFoodsByIdsQuery } from "@/features/food/api/foodApi";
import { useAddOrderMutation } from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { CreateOrderItemType, CreateOrderType } from "@/utils/types/order.type";
import { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderSummary = (): ReactElement => {
  const { cartItems } = useAppSelector((state) => state.cart.data);
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);

  const dispatch = useAppDispatch();

  const ids: string[] = Object.keys(cartItems);

  const { data: foods, isLoading: isFoodsLoading } = useGetFoodsByIdsQuery({
    id: ids,
  });
  const [useAddOrder] = useAddOrderMutation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (isFoodsLoading) {
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
      fullname: currentUser!.fullname,
      address: currentUser!.address as string,
      phoneNumber: currentUser!.phoneNumber as string,
      orderItems: items,
    };

    try {
      const { isSuccess } = await useAddOrder(result).unwrap();

      if (isSuccess) {
        dispatch(clearCart());
        navigate("/");
      }
    } catch (err: any) {
      setError(err.data.message);
    }
  };

  return (
    <>
      <h1>Adatok</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>{currentUser!.address}</div>
      <div>{currentUser!.phoneNumber}</div>

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
