import {
  addAllFoods,
  addFood,
  clearFoods,
  removeFood,
} from "@/features/dashboard/components/promotion/promotionSlice";
import FilterCategory from "@/features/filter-order-limit/components/FilterCategory";
import { useGetFoodsQuery } from "@/features/food/api/foodApi";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

const DashboardPromotionFoods = (): ReactElement => {
  const location = useLocation();
  const categoryId = useAppSelector((state) => state.filter.data.categoryId);
  const promotionFoods = useAppSelector((state) => state.promotion.data.foods);
  console.log(location);

  const { data, isLoading } = useGetFoodsQuery({ categoryId });
  const dispatch = useAppDispatch();
  const { foods } = data ?? {};

  const isFoodAlreadyAdded = (food: FoodType): boolean => {
    const index = promotionFoods.findIndex(
      (item) => item.foodId === food.foodId
    );

    return index === -1;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-2/3 flex justify-center items-center flex-col mx-auto mb-10">
      <div className="flex justify-around w-full mb-3">
        <RedirectButton
          buttonText="Vissza"
          route={location.state.redirectTo}
          redirectTo="/dashboard/promotions"
        />
        <FilterCategory />

        {foods && (
          <div className="flex gap-3">
            <Button variant="danger" onClick={() => dispatch(clearFoods())}>
              Összes törlése
            </Button>
            <Button
              variant="secondary"
              onClick={() => dispatch(addAllFoods(foods))}
            >
              Összes hozzáadása
            </Button>
          </div>
        )}
      </div>

      {foods &&
        foods.map((food) => (
          <div
            key={food.foodId}
            className="w-full border py-3 my-2 px-4 flex justify-between"
          >
            <p>{food.name}</p>

            {isFoodAlreadyAdded(food) ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => dispatch(addFood(food))}
              >
                Hozzáadd
              </Button>
            ) : (
              <Button
                size="sm"
                variant="danger"
                onClick={() => dispatch(removeFood(food))}
              >
                Töröl
              </Button>
            )}
          </div>
        ))}
    </div>
  );
};

export default DashboardPromotionFoods;
