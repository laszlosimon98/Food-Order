import { cn } from "@/utils/cn";
import { HTMLAttributes, ReactElement } from "react";

type FoodImageProps = HTMLAttributes<HTMLDivElement> & {
  url: string | null;
  description?: string;
  width?: number;
};

const FoodImage = ({
  url,
  description,
  width,
  className,
}: FoodImageProps): ReactElement => {
  const image: string | undefined = `${process.env.SERVER}/uploads/${url}`;

  return (
    <div
      className={cn("flex justify-center items-center w-full h-32", className)}
    >
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
