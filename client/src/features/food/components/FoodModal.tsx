import { useGetFoodByIdQuery } from "@/features/food/api/foodApi";
import FoodHeader from "@/features/food/components/FoodHeader";
import FoodImage from "@/features/food/components/FoodImage";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";

const FoodModal = (): ReactElement => {
  const { foodId } = useParams();
  const { data: food, isLoading } = useGetFoodByIdQuery({
    id: parseInt(foodId as string),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!food) {
    return <div>Az étel nem található</div>;
  }

  return (
    <div className="bg-white w-[80%] h-[46rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl">
      <FoodHeader className="mt-5 text-3xl">{food.name}</FoodHeader>
      <FoodImage
        description={food.description}
        url={food.imageUrl}
        width={500}
      />
    </div>
  );
};

export default FoodModal;
