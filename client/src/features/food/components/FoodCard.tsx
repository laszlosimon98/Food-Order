import { saveItem } from "@/features/cart/slice/cartSlice";
import FoodHeader from "@/features/food/components/FoodHeader";
import FoodImage from "@/features/food/components/FoodImage";
import Properties from "@/features/shared/components/Properties";
import Button from "@/features/shared/components/Button";
import Card from "@/features/shared/components/Card";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { FoodType } from "@/utils/types/food.type";
import { ReactElement } from "react";
import { hasPermission, RolesEnum } from "@/utils/roles";

type FoodCardProps = {
  food: FoodType;
};

const FoodCard = ({ food }: FoodCardProps): ReactElement => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);
  const hasActivePromotion = food.promotions.find(
    (promotion) => promotion.isActive
  );

  return (
    <Card>
      <FoodHeader>{food.name}</FoodHeader>
      <FoodImage url={food.imageUrl} description={food.description} />

      <Properties
        property="Ár:"
        value={`${food.price} Ft`}
        discount={hasActivePromotion && food.discountPrice}
      />
      <Properties
        property="Csípős:"
        value={`${food.isSpice ? "Igen" : "Nem"}`}
      />
      <Properties
        property="Vegetáriánus:"
        value={`${food.isVegetarian ? "Igen" : "Nem"}`}
      />
      <div className="flex justify-center gap-10 mx-5 mb-3 mt-5 ">
        {hasPermission([RolesEnum.USER], currentUser) && (
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(saveItem(food));
            }}
          >
            Kosárba
          </Button>
        )}
      </div>
    </Card>
  );
};

export default FoodCard;
