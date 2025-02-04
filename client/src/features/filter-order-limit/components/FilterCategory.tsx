import { useGetCategoriesQuery } from "@/features/category/api/categoryApi";
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
      <h1>Categóriák</h1>
      <Select
        onChange={(e) =>
          dispatch(setCategoryId((e.target as HTMLSelectElement).value))
        }
      >
        <option value=""></option>
        {categories &&
          categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default FilterCategory;
