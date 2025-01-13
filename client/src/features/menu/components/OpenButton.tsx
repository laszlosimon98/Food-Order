import { ReactElement } from "react";

type OpenButtonProps = {
  openMenu: () => void;
};

const OpenButton = ({ openMenu }: OpenButtonProps): ReactElement => {
  return (
    <>
      <button className="absolute top-3 right-3 md:hidden" onClick={openMenu}>
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="hamburger" transform="translate(40, 10)">
            <rect x="20" y="0" width="30" height="6" rx="5" fill="black" />
            <rect x="20" y="10" width="30" height="6" rx="5" fill="black" />
            <rect x="20" y="20" width="30" height="6" rx="5" fill="black" />
          </g>
        </svg>
      </button>
    </>
  );
};

export default OpenButton;
