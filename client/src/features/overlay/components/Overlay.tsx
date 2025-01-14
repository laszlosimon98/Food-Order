import { ReactElement } from "react";

const Overlay = (): ReactElement => {
  return (
    <div className="absolute top-0 left-0 bg-black bg-opacity-50 inset-0"></div>
  );
};

export default Overlay;
