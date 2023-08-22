import React from "react";
import { WaterConsumption } from "../Shared/WaterConsumption/WaterConsumption";

interface IPropTypes {
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const IndustryWaterConsumption: React.FC<IPropTypes> = ({
  parentData,
  useGetMutation,
  id = 0,
  isExpert,
}) => {
  return (
    <WaterConsumption
      parentData={parentData}
      useTypeCategory={3}
      title="مصرف آب دام / طیور / آبزیان"
      id={id}
      useGetMutation={useGetMutation}
      isExpert={isExpert}
    />
  );
};

export { IndustryWaterConsumption };
