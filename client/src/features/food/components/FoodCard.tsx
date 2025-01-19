import Button from "@/shared/components/Button";
import FoodHeader from "features/food/components/FoodHeader";
import FoodImage from "features/food/components/FoodImage";
import FoodProperties from "features/food/components/FoodProperties";
import { ReactElement } from "react";
import { FoodType } from "utils/types/food.type";

type FoodCardProps = {
  food: FoodType;
};

const FoodCard = ({ food }: FoodCardProps): ReactElement => {
  return (
    <div className="w-[32rem] bg-white m-5 py-3 px-2 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition-all md:w-[28rem]">
      <FoodHeader>{food.name}</FoodHeader>
      <FoodImage url={food.imageUrl} description={food.description} />

      <FoodProperties property="Ár:" value={`${food.price} Ft`} />
      <FoodProperties
        property="Csípős:"
        value={`${food.isSpice ? "Igen" : "Nem"}`}
      />
      <FoodProperties
        property="Vegetáriánus:"
        value={`${food.isVegetarian ? "Igen" : "Nem"}`}
      />
      <div className="flex justify-center mx-5 mb-3 z-20">
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="mt-5"
        >
          Kosárba
        </Button>
      </div>
    </div>
  );
};

export default FoodCard;
