import Cart from "@/features/cart/components/Cart";
import CartItem from "@/features/cart/components/CartItem";
import Header from "@/features/menu/components/Header";
import MenuTitle from "@/features/menu/components/MenuTitle";
import Navigation from "@/features/menu/components/Navigation";
import ShoppingCart from "@/features/menu/components/ShoppingCart";
import SmallDeviceIcons from "@/features/menu/components/SmallDeviceIcons";
import { closeOverlays } from "@/features/overlay/slice/overlaySlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks/store.hooks";
import { ReactElement } from "react";

const Menu = (): ReactElement => {
  const { isMenuOverlayOpen } = useAppSelector((state) => state.overlay.data);

  const dispatch = useAppDispatch();

  return (
    <Header>
      <MenuTitle />

      <div className="flex gap-6 flex-row-reverse md:flex-row">
        <SmallDeviceIcons />

        <Navigation
          isMenuOverlayOpen={isMenuOverlayOpen}
          closeMenu={() => dispatch(closeOverlays())}
        />
      </div>
    </Header>
  );
};

export default Menu;
