import { saveItem } from "@/features/cart/slice/cartSlice";
import FoodHeader from "@/features/food/components/FoodHeader";
import FoodImage from "@/features/food/components/FoodImage";
import FoodProperties from "@/features/food/components/FoodProperties";
import { openFoodOverlay } from "@/features/overlay/slice/overlaySlice";
import Button from "@/features/shared/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";

type FoodCardProps = {
  food: FoodType;
};

const FoodCard = ({ food }: FoodCardProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { isFoodOverlayOpen } = useAppSelector((state) => state.overlay.data);

  return (
    <div
      className={`w-[32rem] bg-white m-5 py-3 px-2 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition-all md:w-[28rem] ${
        isFoodOverlayOpen ? "-z-10" : ""
      }`}
      onClick={() => dispatch(openFoodOverlay())}
    >
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
      <div className="flex justify-center mx-5 mb-3 ">
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(saveItem(food));
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
