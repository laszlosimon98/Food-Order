import { useGetCategoriesQuery } from "@/features/category/api/categoryApi";
import { setCategoryId } from "@/features/fitler-order-limit/slice/filterOrderLimitSlice";
import Loading from "@/features/shared/components/Loading";
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
      <select onChange={(e) => dispatch(setCategoryId(e.target.value))}>
        <option value=""></option>
        {categories &&
          categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterCategory;
