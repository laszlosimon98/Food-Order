import FilterContainer from "@/features/filter-order-limit/components/FIlterContainer";
import Limit from "@/features/filter-order-limit/components/Limit";
import OrderItems from "@/features/filter-order-limit/components/OrderItems";
import Pagination from "@/features/filter-order-limit/components/Pagination";
import { useGetFoodsQuery } from "@/features/food/api/foodApi";
import FoodCard from "@/features/food/components/FoodCard";
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

  const { data, isLoading: isFoodsLoading } = useGetFoodsQuery({
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

  const { count: foodCount, foods } = data ?? {};

  const pageButtonCount = Math.ceil(
    (foodCount as number) / (limit ? limit : (foodCount as number))
  );

  if (isFoodsLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <FilterContainer />
        <OrderItems />
        <Limit />
      </div>

      <div className="flex flex-wrap justify-center items-center">
        {foods &&
          foods.map((food: FoodType) => (
            <Link key={food.foodId} to={`/foods/${food.foodId}`}>
              <FoodCard food={food} />
            </Link>
          ))}
      </div>
      <Pagination pageButtonCount={pageButtonCount} />
    </>
  );
};

export default Foods;
