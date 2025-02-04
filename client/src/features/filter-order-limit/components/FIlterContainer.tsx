import FilterCategory from "@/features/filter-order-limit/components/FilterCategory";
import FilterHasRating from "@/features/filter-order-limit/components/FilterHasRating";
import FilterIsOnPromotion from "@/features/filter-order-limit/components/FilterIsOnPromotion";
import FilterIsSpice from "@/features/filter-order-limit/components/FilterIsSpice";
import FilterIsVegetarian from "@/features/filter-order-limit/components/FilterIsVegetarian";
import FilterMax from "@/features/filter-order-limit/components/FilterMax";
import FilterMin from "@/features/filter-order-limit/components/FilterMin";
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
