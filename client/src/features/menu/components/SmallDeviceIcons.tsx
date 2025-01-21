import { closeCart } from "@/features/cart/slice/cartSlice";
import {
  openMenuOverlay,
  closeOverlays,
} from "@/features/overlay/slice/overlaySlice";
import Icon from "@/features/shared/components/Icon";
import { useAppSelector, useAppDispatch } from "@/store/hooks/store.hooks";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

type SmallDeviceIconsProps = {};

const SmallDeviceIcons = ({}: SmallDeviceIconsProps): ReactElement => {
  const { isMenuOverlayOpen } = useAppSelector((state) => state.overlay.data);
  const dispatch = useAppDispatch();

  return (
    <div className="md:hidden">
      {!isMenuOverlayOpen && (
        <Icon
          icon={faBars}
          size="2x"
          onClick={() => {
            dispatch(openMenuOverlay());
            dispatch(closeCart());
          }}
        />
      )}

      {isMenuOverlayOpen && (
        <Icon
          icon={faClose}
          size="2x"
          onClick={() => dispatch(closeOverlays())}
        />
      )}
    </div>
  );
};

export default SmallDeviceIcons;
