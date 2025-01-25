import { closeOverlays } from "@/features/overlay/slice/overlaySlice";
import { useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Overlay = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="absolute top-0 left-0 bg-black bg-opacity-80 inset-0"
      onClick={() => {
        dispatch(closeOverlays());
        if (location.state) {
          navigate(location.state.redirectTo);
        } else {
          navigate("/");
        }
      }}
    ></div>
  );
};

export default Overlay;
