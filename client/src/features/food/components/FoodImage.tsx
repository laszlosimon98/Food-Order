import { ReactElement } from "react";

type FoodImageProps = {
  url: string | null;
  description: string;
  width?: number;
};

const FoodImage = ({
  url,
  description,
  width,
}: FoodImageProps): ReactElement => {
  const image: string | null = `${process.env.SERVER_ADDRESS}/uploads/${url}`;

  return (
    <div className="flex justify-center items-center w-full h-32 ">
      {url !== null ? (
        <img
          src={image}
          alt={`${description}`}
          width={width ?? 250}
          className="rounded-2xl"
        />
      ) : (
        <p className="text-xl">Nincs kép</p>
      )}
    </div>
  );
};

export default FoodImage;
