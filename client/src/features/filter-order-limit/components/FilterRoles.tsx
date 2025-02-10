import { translateRole } from "@/features/dashboard/components/users/DashboardUser";
import { setRole } from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import Select from "@/features/shared/components/form/Select";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { RolesEnum } from "@/utils/roles";
import { ReactElement } from "react";

const FilterRoles = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-5 items-center">
      <Select
        label="Szerepkörök"
        onChange={(e) =>
          dispatch(setRole((e.target as HTMLSelectElement).value))
        }
      >
        <option value=""></option>
        {Object.values(RolesEnum)
          .reverse()
          .map((value) => (
            <option key={value} value={value}>
              {translateRole(value)}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default FilterRoles;
