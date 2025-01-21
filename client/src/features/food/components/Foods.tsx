import { useGetFoodsQuery } from "@/features/food/api/foodApi";
import FoodCard from "@/features/food/components/FoodCard";
import FoodModal from "@/features/food/components/FoodModal";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Foods = (): ReactElement => {
  const { data: foods } = useGetFoodsQuery({});
  const { isFoodOverlayOpen } = useAppSelector((state) => state.overlay.data);

  return (
    <>
      {isFoodOverlayOpen ? (
        <FoodModal />
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {foods &&
            foods.map((food: FoodType) => (
              <Link key={food.foodId} to={`/${food.foodId}`}>
                <FoodCard food={food} />
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default Foods;
