import { closeCart } from "@/features/cart/slice/cartSlice";
import {
  openOverlay,
  closeOverlay,
} from "@/features/overlay/slice/overlaySlice";
import Icon from "@/features/shared/components/Icon";
import { useAppSelector, useAppDispatch } from "@/store/hooks/store.hooks";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

type SmallDeviceIconsProps = {};

const SmallDeviceIcons = ({}: SmallDeviceIconsProps): ReactElement => {
  const { isOverlayVisible } = useAppSelector((state) => state.overlay.data);
  const dispatch = useAppDispatch();

  return (
    <div className="md:hidden">
      {!isOverlayVisible && (
        <Icon
          icon={faBars}
          size="2x"
          onClick={() => {
            dispatch(openOverlay());
            dispatch(closeCart());
          }}
        />
      )}

      {isOverlayVisible && (
        <Icon
          icon={faClose}
          size="2x"
          onClick={() => dispatch(closeOverlay())}
        />
      )}
    </div>
  );
};

export default SmallDeviceIcons;
