import FilterCategory from "@/features/fitler-order-limit/components/FilterCategory";
import FilterHasRating from "@/features/fitler-order-limit/components/FilterHasRating";
import FilterIsOnPromotion from "@/features/fitler-order-limit/components/FilterIsOnPromotion";
import FilterIsSpice from "@/features/fitler-order-limit/components/FilterIsSpice";
import FilterIsVegetarian from "@/features/fitler-order-limit/components/FilterIsVegetarian";
import FilterMax from "@/features/fitler-order-limit/components/FilterMax";
import FilterMin from "@/features/fitler-order-limit/components/FilterMin";
import { ReactElement } from "react";

const FilterContainer = (): ReactElement => {
  return (
    <div>
      <h2>Szűrés</h2>
      <FilterCategory />
      <FilterIsSpice />
      <FilterIsVegetarian />
      <FilterMin />
      <FilterMax />
      <FilterIsOnPromotion />
      <FilterHasRating />
    </div>
  );
};

export default FilterContainer;
