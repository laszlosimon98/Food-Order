import { CategoryType } from "@/utils/types/category.type";
import { ReactElement } from "react";

type CategoriesProps = {
  categories?: CategoryType[];
};

const Categories = ({ categories }: CategoriesProps): ReactElement => {
  return (
    <>
      <option value=""></option>
      {categories &&
        categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </option>
        ))}
    </>
  );
};

export default Categories;
