import { useGetFavoriteFoodsQuery } from "@/features/food/api/foodApi";
import FoodCard from "@/features/food/components/FoodCard";
import FoodModal from "@/features/food/components/FoodModal";
import Loading from "@/features/shared/components/Loading";
import PageTitle from "@/features/shared/components/PageTitle";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const FavoriteFood = (): ReactElement => {
  const { data, isLoading } = useGetFavoriteFoodsQuery();
  const { isFoodOverlayOpen } = useAppSelector((state) => state.overlay.data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>Kedvenc ételeim</PageTitle>
      {isFoodOverlayOpen ? (
        <FoodModal />
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {data &&
            data.map((food: FoodType) => (
              <Link
                key={food.foodId}
                to={`/${food.foodId}`}
                state={{ redirectTo: "/favorite-foods" }}
              >
                <FoodCard food={food} />
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default FavoriteFood;
