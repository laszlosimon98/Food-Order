import { ReactElement } from "react";

type CloseButtonProps = {
  closeMenu: () => void;
};

const CloseButton = ({ closeMenu }: CloseButtonProps): ReactElement => {
  return (
    <button className="absolute top-3 right-3 md:hidden" onClick={closeMenu}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="x" transform="translate(60, 5)">
          <line x1="0" y1="0" x2="30" y2="30" stroke="black" strokeWidth="3" />
          <line x1="30" y1="0" x2="0" y2="30" stroke="black" strokeWidth="3" />
        </g>
      </svg>
    </button>
  );
};

export default CloseButton;
