import DashboardFood from "@/features/dashboard/components/food/DashboardFood";
import FilterCategory from "@/features/filter-order-limit/components/FilterCategory";
import { useGetFoodsQuery } from "@/features/food/api/foodApi";
import Loading from "@/features/shared/components/Loading";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { useAppSelector } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

type DashboardFoodsProps = {};

const DashboardFoods = ({}: DashboardFoodsProps): ReactElement => {
  const location = useLocation();
  const categoryId = useAppSelector((state) => state.filter.data.categoryId);

  const { data: foods, isLoading } = useGetFoodsQuery({ categoryId });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center gap-20">
        <FilterCategory />
        <h1 className="text-2xl font-bold">Ételek</h1>

        <RedirectButton
          buttonText="Új étel"
          route="create"
          redirectTo={location.pathname}
        />
      </div>

      {foods &&
        foods.map((food) => <DashboardFood key={food.foodId} food={food} />)}
    </div>
  );
};

export default DashboardFoods;
