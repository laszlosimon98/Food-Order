import Property from "@/features/shared/components/Property";
import Value from "@/features/shared/components/Value";
import { cn } from "@/utils/cn";
import { HTMLAttributes, ReactElement } from "react";

type PropertiesProps = HTMLAttributes<HTMLDivElement> & {
  property: string;
  value: string;
};

const Properties = ({
  property,
  value,
  className,
}: PropertiesProps): ReactElement => {
  return (
    <div
      className={cn(
        "flex justify-between px-3 my-2 gap-1 md:gap-0 md:items-center md:justify-between",
        className
      )}
    >
      <Property>{property}</Property>
      <Value>{value}</Value>
    </div>
  );
};

export default Properties;
