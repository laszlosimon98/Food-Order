import { useDeleteFoodMutation } from "@/features/food/api/foodApi";
import FoodHeader from "@/features/food/components/FoodHeader";
import FoodImage from "@/features/food/components/FoodImage";
import Button from "@/features/shared/components/Button";
import Properties from "@/features/shared/components/Properties";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

type DashboardFoodProps = {
  food: FoodType;
};

const DashboardFood = ({ food }: DashboardFoodProps): ReactElement => {
  const location = useLocation();
  const [useDeleteFood] = useDeleteFoodMutation();

  const handleDelete = async (foodId: number) => {
    await useDeleteFood({ id: foodId });
  };

  return (
    <div className="w-1/2 mx-auto shadow-md rounded-lg px-4 py-2 flex items-center gap-16 my-8">
      <div className="w-3/4 mx-auto">
        <FoodHeader>{food.name}</FoodHeader>
        <FoodImage url={food.imageUrl} description={food.description} />

        <Properties property="Ár:" value={`${food.price} Ft`} />
        <Properties
          property="Csípős:"
          value={`${food.isSpice ? "Igen" : "Nem"}`}
        />
        <Properties
          property="Vegetáriánus:"
          value={`${food.isVegetarian ? "Igen" : "Nem"}`}
        />
        <div className="w-full flex gap-6 justify-center items-center my-4">
          <RedirectButton
            buttonText="Módosítás"
            route={`modify/${food.foodId}`}
            redirectTo={location.pathname}
          />
          <Button variant="danger" onClick={() => handleDelete(food.foodId)}>
            Törlés
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFood;
