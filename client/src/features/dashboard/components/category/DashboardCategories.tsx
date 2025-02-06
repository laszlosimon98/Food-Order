import { useGetCategoriesQuery } from "@/features/category/api/categoryApi";
import Category from "@/features/dashboard/components/category/DashboardCategory";
import Loading from "@/features/shared/components/Loading";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

type DashboardCategoriesProps = {};

const DashboardCategories = ({}: DashboardCategoriesProps): ReactElement => {
  const location = useLocation();
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center gap-20">
        <h1 className="text-2xl font-bold">Kategóriák</h1>

        <RedirectButton
          buttonText="Új kategória"
          route="create"
          redirectTo={location.pathname}
        />
      </div>

      {categories &&
        categories.map((category) => (
          <Category key={category.categoryId} category={category} />
        ))}
    </div>
  );
};

export default DashboardCategories;
