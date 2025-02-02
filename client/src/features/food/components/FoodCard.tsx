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
import { hasPermission, RolesEnum } from "@/utils/roles";
import { useDeleteFoodMutation } from "@/features/food/api/foodApi";

type FoodCardProps = {
  food: FoodType;
};

const FoodCard = ({ food }: FoodCardProps): ReactElement => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.data.currentUser);

  const [useDeleteFood] = useDeleteFoodMutation();

  const handleDelete = async (id: number) => {
    await useDeleteFood({ id });
  };

  return (
    <Card
      onClick={() => {
        if (
          !hasPermission([RolesEnum.ADMIN, RolesEnum.EMPLOYEE], currentUser)
        ) {
          dispatch(openFoodOverlay());
        }
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
      <div className="flex justify-center gap-10 mx-5 mb-3 mt-5 ">
        {hasPermission([RolesEnum.ADMIN], currentUser) ? (
          <>
            <Button variant="secondary">Módosítás</Button>
            <Button
              variant="danger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(food.foodId);
              }}
            >
              Törlés
            </Button>
          </>
        ) : (
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
