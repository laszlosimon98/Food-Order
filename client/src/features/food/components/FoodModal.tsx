import { saveItem } from "@/features/cart/slice/cartSlice";
import {
  useAddFavoriteFoodMutation,
  useDeleteFavoriteFoodMutation,
  useGetFavoriteFoodByIdQuery,
  useGetFoodByIdQuery,
} from "@/features/food/api/foodApi";
import FoodHeader from "@/features/food/components/FoodHeader";
import FoodImage from "@/features/food/components/FoodImage";
import FoodProperties from "@/features/shared/components/Properties";
import { closeOverlays } from "@/features/overlay/slice/overlaySlice";
import Button from "@/features/shared/components/Button";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRemove } from "@fortawesome/free-solid-svg-icons";

const FoodModal = (): ReactElement => {
  const { foodId } = useParams();

  const { data: food, isLoading } = useGetFoodByIdQuery({
    id: parseInt(foodId as string),
  });

  const { data: favoriteFood, isLoading: isFavoriteFoodLoading } =
    useGetFavoriteFoodByIdQuery({ id: parseInt(foodId as string) });

  const [useAddFavoriteFood] = useAddFavoriteFoodMutation();
  const [useDeleteFavoriteFood] = useDeleteFavoriteFoodMutation();

  const dispatch = useAppDispatch();

  if (isLoading || isFavoriteFoodLoading) {
    return <div>Loading...</div>;
  }

  if (!food) {
    return <div>Az étel nem található</div>;
  }

  return (
    <div className="bg-white w-[50%] min-h-[32rem] h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl">
      {!favoriteFood ? (
        <Button
          className="absolute top-5 right-5"
          onClick={() =>
            useAddFavoriteFood({ foodId: parseInt(foodId as string) })
          }
        >
          <FontAwesomeIcon icon={faHeart} />
        </Button>
      ) : (
        <Button
          className="absolute top-5 right-5"
          onClick={() =>
            useDeleteFavoriteFood({ id: parseInt(foodId as string) })
          }
        >
          <FontAwesomeIcon icon={faRemove} />
        </Button>
      )}

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

      <div className="flex justify-center h-full py-6">
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(saveItem(food));
            dispatch(closeOverlays());
          }}
        >
          Kosárba
        </Button>
      </div>
    </div>
  );
};

export default FoodModal;
