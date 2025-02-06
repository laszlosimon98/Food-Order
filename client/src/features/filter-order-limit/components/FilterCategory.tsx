import { useGetCategoriesQuery } from "@/features/category/api/categoryApi";
import Categories from "@/features/category/components/Categories";
import { setCategoryId } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import Loading from "@/features/shared/components/Loading";
import Select from "@/features/shared/components/Select";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const FilterCategory = (): ReactElement => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const dispatch = useAppDispatch();

  if (isCategoriesLoading) {
    return <Loading />;
  }
  return (
    <div className="w-44  flex justify-between items-center">
      <Select
        label="Kategóriák"
        onChange={(e) =>
          dispatch(setCategoryId((e.target as HTMLSelectElement).value))
        }
      >
        <Categories categories={categories} />
      </Select>
    </div>
  );
};

export default FilterCategory;
