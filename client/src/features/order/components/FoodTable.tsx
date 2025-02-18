import { useAppSelector } from "@/store/hooks/store.hooks";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";

type FoodTableProps = {
  foods: FoodType[];
};

const FoodTable = ({ foods }: FoodTableProps): ReactElement => {
  const { cartItems } = useAppSelector((state) => state.cart.data);

  return (
    <table className="w-full border mb-8">
      <thead>
        <tr>
          <th className="p-2">Név</th>
          <th className="p-2">Ár</th>
          <th className="p-2">Mennyiség</th>
        </tr>
      </thead>
      <tbody>
        {foods.map((food) => (
          <tr key={food.foodId} className="even:bg-baseColor">
            <td className="p-2">{food.name}</td>
            <td className="p-2">{food.price} Ft</td>
            <td className="p-2">
              {cartItems[food.foodId] && cartItems[food.foodId].quantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FoodTable;
