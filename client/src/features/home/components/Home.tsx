import { useGetFoodsQuery } from "features/food/api/foodApi";
import FoodCard from "features/food/components/FoodCard";
import { ReactElement } from "react";
import { FoodType } from "utils/types/food.type";

const Home = (): ReactElement => {
  const { data: foods } = useGetFoodsQuery({});

  return (
    <div className="min-h-calcScreen">
      <h1 className="text-3xl font-bold text-center pt-5 mb-3 italic underline ">
        Ételek
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {foods &&
          foods.map((food: FoodType) => (
            <FoodCard key={food.foodId} food={food} />
          ))}
      </div>
    </div>
  );
};

export default Home;
