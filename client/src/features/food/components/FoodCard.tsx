import { saveItem } from "@/features/cart/slice/cartSlice";
import FoodHeader from "@/features/food/components/FoodHeader";
import FoodImage from "@/features/food/components/FoodImage";
import Properties from "@/features/shared/components/Properties";
import { openFoodOverlay } from "@/features/overlay/slice/overlaySlice";
import Button from "@/features/shared/components/Button";
import Card from "@/features/shared/components/Card";
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
    <Card
      className={`${isFoodOverlayOpen ? "-z-10" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(openFoodOverlay());
      }}
    >
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
    </Card>
  );
};

export default FoodCard;
