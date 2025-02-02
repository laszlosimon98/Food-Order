import { useGetFavoriteFoodsQuery } from "@/features/food/api/foodApi";
import FoodCard from "@/features/food/components/FoodCard";
import Loading from "@/features/shared/components/Loading";
import PageTitle from "@/features/shared/components/PageTitle";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const FavoriteFood = (): ReactElement => {
  const { data, isLoading } = useGetFavoriteFoodsQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>Kedvenc ételeim</PageTitle>
      <div className="flex flex-wrap justify-center items-center">
        {data &&
          data.map((food: FoodType) => (
            <Link key={food.foodId} to={`/foods/${food.foodId}`}>
              <FoodCard food={food} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default FavoriteFood;
