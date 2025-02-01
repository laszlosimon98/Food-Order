import {
  useGetFavoriteFoodByIdQuery,
  useAddFavoriteFoodMutation,
  useDeleteFavoriteFoodMutation,
} from "@/features/food/api/foodApi";
import Button from "@/features/shared/components/Button";
import Loading from "@/features/shared/components/Loading";
import { faHeart, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

type FavoriteButtonIconsProps = {
  foodId: number;
};

const FavoriteButtonIcons = ({
  foodId,
}: FavoriteButtonIconsProps): ReactElement => {
  const { data: favoriteFood, isLoading: isFavoriteFoodLoading } =
    useGetFavoriteFoodByIdQuery({ id: foodId });

  const [useAddFavoriteFood] = useAddFavoriteFoodMutation();
  const [useDeleteFavoriteFood] = useDeleteFavoriteFoodMutation();

  if (isFavoriteFoodLoading) {
    return <Loading />;
  }

  return (
    <>
      {!favoriteFood ? (
        <Button
          className="absolute top-5 right-5 z-20"
          onClick={() => useAddFavoriteFood({ foodId })}
          size="icon"
        >
          <FontAwesomeIcon icon={faHeart} />
        </Button>
      ) : (
        <Button
          className="absolute top-5 right-5 z-20"
          onClick={() => useDeleteFavoriteFood({ id: foodId })}
          size="icon"
        >
          <FontAwesomeIcon icon={faRemove} />
        </Button>
      )}
    </>
  );
};

export default FavoriteButtonIcons;
