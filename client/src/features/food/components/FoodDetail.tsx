import { saveItem } from "@/features/cart/slice/cartSlice";
import { useGetFoodByIdQuery } from "@/features/food/api/foodApi";
import FoodHeader from "@/features/food/components/FoodHeader";
import FoodImage from "@/features/food/components/FoodImage";
import FoodProperties from "@/features/shared/components/Properties";
import Button from "@/features/shared/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteButtonIcons from "@/features/food/components/FavoriteButtonIcons";
import { hasPermission, RolesEnum } from "@/utils/roles";
import Reviews from "@/features/review/components/Reviews";

const FoodDetail = (): ReactElement => {
  const { foodId } = useParams();

  const currentUser = useAppSelector((state) => state.auth.data.currentUser);

  const { data: food, isLoading } = useGetFoodByIdQuery({
    id: parseInt(foodId as string),
  });

  const dispatch = useAppDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!food) {
    return <div>Az étel nem található</div>;
  }

  const { reviews } = food;

  return (
    <div className="w-full min-h-calcScreen flex justify-center items-center">
      <div className="w-full  min-h-[40rem] h-fit flex flex-col justify-center items-center relative">
        <FoodHeader className="mt-5 text-3xl">{food.name}</FoodHeader>
        <FoodImage
          description={food.description}
          url={food.imageUrl}
          width={500}
          className="h-[16rem]"
        />
        <div className="text-xl mx-auto w-1/2 h-fit mb-3">
          Leírás:
          <span className="text-base ml-4">{food.description}</span>
        </div>
        <div className="w-1/2 mx-auto">
          <FoodProperties property="Ár:" value={`${food.price} Ft`} />
          <FoodProperties
            property="Csípős:"
            value={`${food.isSpice ? "Igen" : "Nem"}`}
          />
          <FoodProperties
            property="Vegetáriánus:"
            value={`${food.isVegetarian ? "Igen" : "Nem"}`}
          />
        </div>

        <Reviews reviews={reviews} />

        <div className="flex justify-center h-full py-6 gap-8">
          {!hasPermission(
            [RolesEnum.ADMIN, RolesEnum.EMPLOYEE],
            currentUser
          ) && (
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(saveItem(food));
              }}
            >
              Kosárba
            </Button>
          )}

          {hasPermission([RolesEnum.USER], currentUser) && (
            <>
              <Button variant="secondary">
                <Link to={`/reviews/addreview/${food.foodId}`}>Értékelés</Link>
              </Button>
              <FavoriteButtonIcons foodId={parseInt(foodId as string)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
