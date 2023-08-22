import React from "react";
import { WaterConsumption } from "../Shared/WaterConsumption/WaterConsumption";

interface IPropTypes {
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const BirdsWaterConsumption: React.FC<IPropTypes> = ({
  parentData,
  id = 0,
  useGetMutation,
  isExpert,
}) => {
  return (
    <WaterConsumption
      parentData={parentData}
      useTypeCategory={2}
      title="مصرف آب دام / طیور / آبزیان"
      id={id}
      useGetMutation={useGetMutation}
      isExpert={isExpert}
    />
  );
};

export { BirdsWaterConsumption };
