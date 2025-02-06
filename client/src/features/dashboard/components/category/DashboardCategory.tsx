import { useDeleteCategoryMutation } from "@/features/category/api/categoryApi";
import Button from "@/features/shared/components/Button";
import RedirectButton from "@/features/shared/components/RedirectButton";
import { CategoryType } from "@/utils/types/category.type";
import { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";

type DashboardCategoryProps = {
  category: CategoryType;
};

const DashboardCategory = ({
  category,
}: DashboardCategoryProps): ReactElement => {
  const location = useLocation();

  const [useDeleteCategory] = useDeleteCategoryMutation();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (categoryId: number) => {
    try {
      await useDeleteCategory({ id: categoryId }).unwrap();
    } catch (error: any) {
      setError(error.data.message);
    }
  };

  return (
    <div className="w-1/2 my-5 flex flex-col justify-around items-center mx-auto shadow-md rounded-lg py-3">
      <div className="w-1/2 flex justify-between flex-wrap items-center gap-8">
        <div className="text-lg font-semibold">{category.categoryName}</div>
        <div className="flex gap-10 flex-wrap">
          <RedirectButton
            buttonText="Módosít"
            route={`modify/${category.categoryId}`}
            redirectTo={location.pathname}
          />

          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(category.categoryId)}
          >
            Törlés
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm py-2">{error}</p>}
    </div>
  );
};

export default DashboardCategory;
