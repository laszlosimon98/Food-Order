import FoodProperty from "@/features/food/components/FoodProperty";
import FoodValue from "@/features/food/components/FoodValue";
import { ReactElement } from "react";

type FoodPropertiesProps = {
  property: string;
  value: string;
};

const FoodProperties = ({
  property,
  value,
}: FoodPropertiesProps): ReactElement => {
  return (
    <div className="flex justify-between px-8 my-2 items-center">
      <FoodProperty>{property}</FoodProperty>
      <FoodValue>{value}</FoodValue>
    </div>
  );
};

export default FoodProperties;
