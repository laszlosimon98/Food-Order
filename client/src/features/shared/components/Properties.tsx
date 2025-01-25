import Property from "@/features/shared/components/Property";
import Value from "@/features/shared/components/Value";
import { ReactElement } from "react";

type PropertiesProps = {
  property: string;
  value: string;
};

const Properties = ({ property, value }: PropertiesProps): ReactElement => {
  return (
    <div className="flex justify-between px-8 my-2 items-center">
      <Property>{property}</Property>
      <Value>{value}</Value>
    </div>
  );
};

export default Properties;
