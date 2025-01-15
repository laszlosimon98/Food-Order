import Navigation from "@/menu/components/Navigation";
import SvgNavButton from "@/menu/components/SvgNavButton";
import { useAppDispatch, useAppSelector } from "@/storeHooks/store.hooks";
import { close, open } from "features/overlay/slice/overlaySlice";
import { ReactElement } from "react";

const Menu = (): ReactElement => {
  const isOverlayVisible = useAppSelector(
    (state) => state.overlay.isOverlayVisible
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <header className="h-16 w-full bg-baseColor flex flex-row justify-between items-center px-5">
        <h1 className="text-2xl font-bold italic">Ételrendelő</h1>

        <div className="md:hidden">
          {isOverlayVisible && (
            <SvgNavButton fn={() => dispatch(close())}>
              <g id="x" transform="translate(60, 5)">
                <line
                  x1="0"
                  y1="0"
                  x2="30"
                  y2="30"
                  stroke="black"
                  strokeWidth="3"
                />
                <line
                  x1="30"
                  y1="0"
                  x2="0"
                  y2="30"
                  stroke="black"
                  strokeWidth="3"
                />
              </g>
            </SvgNavButton>
          )}

          {!isOverlayVisible && (
            <SvgNavButton fn={() => dispatch(open())}>
              <g id="hamburger" transform="translate(40, 10)">
                <rect x="20" y="0" width="30" height="6" rx="5" fill="black" />
                <rect x="20" y="10" width="30" height="6" rx="5" fill="black" />
                <rect x="20" y="20" width="30" height="6" rx="5" fill="black" />
              </g>
            </SvgNavButton>
          )}
        </div>

        <Navigation
          isOverlayVisible={isOverlayVisible}
          closeMenu={() => dispatch(close())}
        />
      </header>
    </>
  );
};

export default Menu;
