import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

type PropertiesProps = HTMLAttributes<HTMLDivElement> & {
  property: string;
  value: string;
  discount?: number;
};

type PropertyProps = PropsWithChildren & {};
type ValueProps = PropsWithChildren & {};

const Property = ({ children }: PropertyProps): ReactElement => {
  return <div className="text-xl">{children}</div>;
};

const Value = ({ children }: ValueProps): ReactElement => {
  return <div className="text-xl font-semibold">{children}</div>;
};

const Properties = ({
  property,
  value,
  discount,
  className,
}: PropertiesProps): ReactElement => {
  return (
    <div
      className={cn(
        "w-full flex justify-between px-3 my-2 gap-1 md:gap-0 md:items-center md:justify-between",
        className
      )}
    >
      <Property>{property}</Property>
      <Value>
        <p className={`${discount ? "line-through" : ""}`}> {value} </p>
        {discount && <p className="text-red-500"> {discount} Ft </p>}
      </Value>
    </div>
  );
};

export default Properties;
