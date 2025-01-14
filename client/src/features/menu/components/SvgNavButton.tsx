import { PropsWithChildren, ReactElement } from "react";

type SvgNavButtonProps = {
  fn: () => void;
} & PropsWithChildren;

const SvgNavButton = ({ fn, children }: SvgNavButtonProps): ReactElement => {
  return (
    <button className="absolute top-3 right-3 md:hidden" onClick={fn}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </button>
  );
};

export default SvgNavButton;
