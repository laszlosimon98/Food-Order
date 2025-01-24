import FilterContainer from "@/features/fitler-order-limit/components/FIlterContainer";
import Limit from "@/features/fitler-order-limit/components/Limit";
import OrderItems from "@/features/fitler-order-limit/components/OrderItems";
import Pagination from "@/features/fitler-order-limit/components/Pagination";
import {
  useGetFoodCountQuery,
  useGetFoodsQuery,
} from "@/features/food/api/foodApi";
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
    limit,
    page,
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
    limit,
    page,
  });

  const { data: foodCount, isLoading: isFoodCountLoading } =
    useGetFoodCountQuery();

  const { isFoodOverlayOpen } = useAppSelector((state) => state.overlay.data);

  if (isFoodsLoading || isFoodCountLoading) {
    return <Loading />;
  }

  const pageButtonCount = Math.ceil(
    (foodCount as number) / (limit ? limit : (foodCount as number))
  );

  return (
    <>
      <div>
        <FilterContainer />
        <OrderItems />
        <Limit />
      </div>

      {isFoodOverlayOpen ? (
        <FoodModal />
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {foods &&
            foods.map((food: FoodType) => (
              <Link key={food.id} to={`/${food.id}`}>
                <FoodCard food={food} />
              </Link>
            ))}
        </div>
      )}
      <Pagination pageButtonCount={pageButtonCount} />
    </>
  );
};

export default Foods;
