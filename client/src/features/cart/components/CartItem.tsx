import CartButton from "@/features/cart/components/CartButton";
import { removeItem, saveItem } from "@/features/cart/slice/cartSlice";
import { useGetFoodByIdQuery } from "@/features/food/api/foodApi";
import { useAppSelector, useAppDispatch } from "@/store/hooks/store.hooks";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

type CartItemProps = {
  id: string;
};

const CartItem = ({ id }: CartItemProps): ReactElement => {
  const { data: food } = useGetFoodByIdQuery({ id: parseInt(id) });

  const { cartItems } = useAppSelector((state) => state.cart.data);
  const dispatch = useAppDispatch();

  if (!food) {
    return <></>;
  }

  return (
    <div className="w-full h-12 bg-white shadow-md rounded-xl flex items-center justify-between  mt-2">
      <div className="w-4/5 flex justify-between items-center">
        <div className="text-sm font-semibold pl-4">{food.name}</div>
        <div className="w-20 bg-baseColor text-center rounded-3xl flex justify-between items-center">
          <CartButton>
            <FontAwesomeIcon
              icon={faMinus}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeItem(food));
              }}
            />
          </CartButton>

          <div>{cartItems[parseInt(id)].amount}</div>

          <CartButton>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(saveItem(food));
              }}
            />
          </CartButton>
        </div>
      </div>
      <div className="w-1/5 text-center text-sm font-semibold">
        {food.price * cartItems[parseInt(id)].amount} Ft
      </div>
    </div>
  );
};

export default CartItem;
