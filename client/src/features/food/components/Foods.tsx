import { useGetFoodsQuery } from "features/food/api/foodApi";
import FoodCard from "features/food/components/FoodCard";
import { ReactElement } from "react";
import { FoodType } from "utils/types/food.type";

const Foods = (): ReactElement => {
  const { data: foods } = useGetFoodsQuery({});

  return (
    <div className="flex flex-wrap justify-center items-center">
      {foods &&
        foods.map((food: FoodType) => (
          <FoodCard key={food.foodId} food={food} />
        ))}
    </div>
  );
};

export default Foods;
