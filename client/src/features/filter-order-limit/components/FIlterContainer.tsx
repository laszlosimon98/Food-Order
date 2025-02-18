import FilterCategory from "@/features/filter-order-limit/components/FilterCategory";
import FilterHasRating from "@/features/filter-order-limit/components/FilterHasRating";
import FilterIsOnPromotion from "@/features/filter-order-limit/components/FilterIsOnPromotion";
import FilterIsSpice from "@/features/filter-order-limit/components/FilterIsSpice";
import FilterIsVegetarian from "@/features/filter-order-limit/components/FilterIsVegetarian";
import FilterMax from "@/features/filter-order-limit/components/FilterMax";
import FilterMin from "@/features/filter-order-limit/components/FilterMin";
import Limit from "@/features/filter-order-limit/components/Limit";
import OrderItems from "@/features/filter-order-limit/components/OrderItems";
import Button from "@/features/shared/components/Button";
import { ReactElement, useState } from "react";

const FilterContainer = (): ReactElement => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  return (
    <div className="px-6 flex flex-col relative">
      <Button
        variant="secondary"
        size="sm"
        className="self-end"
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      >
        Szűrő
      </Button>

      {isFilterVisible && (
        <div className="w-filter bg-white shadow-lg rounded-2xl p-4 absolute top-10 right-5 z-10">
          <div className="flex flex-col gap-3 flex-wrap">
            <h2 className="text-center text-2xl pb-5 font-semibold">Szűrő</h2>
            <FilterCategory />
            <FilterIsSpice />
            <FilterIsVegetarian />
            <FilterMin />
            <FilterMax />
            <FilterIsOnPromotion />
            <FilterHasRating />
            <OrderItems />
            <Limit />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterContainer;
