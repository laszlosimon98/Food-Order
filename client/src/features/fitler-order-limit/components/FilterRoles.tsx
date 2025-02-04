import { translateRole } from "@/features/dashboard/components/users/User";
import { setRole } from "@/features/fitler-order-limit/slice/filterOrderLimitSlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { RolesEnum } from "@/utils/roles";
import { ReactElement } from "react";

const FilterRoles = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Szerepkörök</h1>
      <select onChange={(e) => dispatch(setRole(e.target.value))}>
        <option value=""></option>
        {Object.values(RolesEnum)
          .reverse()
          .map((value) => (
            <option key={value} value={value}>
              {translateRole(value)}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterRoles;
