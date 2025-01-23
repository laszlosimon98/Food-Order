import FilterCategory from "@/features/fitler-order/components/FilterCategory";
import FilterHasRating from "@/features/fitler-order/components/FilterHasRating";
import FilterIsOnPromotion from "@/features/fitler-order/components/FilterIsOnPromotion";
import FilterIsSpice from "@/features/fitler-order/components/FilterIsSpice";
import FilterIsVegetarian from "@/features/fitler-order/components/FilterIsVegetarian";
import FilterMax from "@/features/fitler-order/components/FilterMax";
import FilterMin from "@/features/fitler-order/components/FilterMin";
import OrderItems from "@/features/fitler-order/components/OrderItems";
import { useGetFoodsQuery } from "@/features/food/api/foodApi";
import FoodCard from "@/features/food/components/FoodCard";
import FoodModal from "@/features/food/components/FoodModal";
import Loading from "@/features/shared/components/Loading";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Foods = (): ReactElement => {
  const {
    categoryId,
    isSpice,
    isVegetarian,
    minValue,
    hasRating,
    isOnPromotion,
    maxValue,
    orderByPrice,
    orderByRating,
  } = useAppSelector((state) => state.filter.data);

  const { data: foods, isLoading: isFoodsLoading } = useGetFoodsQuery({
    categoryId,
    isSpice,
    isVegetarian,
    minValue,
    maxValue,
    hasRating,
    isOnPromotion,
    orderByPrice,
    orderByRating,
  });

  const { isFoodOverlayOpen } = useAppSelector((state) => state.overlay.data);

  if (isFoodsLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h2>Szűrés</h2>
        <FilterCategory />
        <FilterIsSpice />
        <FilterIsVegetarian />
        <FilterMin />
        <FilterMax />
        <FilterIsOnPromotion />
        <FilterHasRating />

        <h2>Rendezés</h2>
        <OrderItems />
      </div>

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
