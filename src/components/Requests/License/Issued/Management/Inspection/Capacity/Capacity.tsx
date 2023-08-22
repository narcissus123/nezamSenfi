import React from "react";
import { CapacityForm } from "./CapacityForm";

interface IPropTypes {
  refetch: any;
  activityData: any;
  isExpert: boolean;
  fixedOrMobieTypeByExpert?: number;
}

const Capacity: React.FC<IPropTypes> = ({
  refetch,
  activityData,
  isExpert,
  fixedOrMobieTypeByExpert = 1,
}) => {
  return (
    <>
      <CapacityForm
        refetch={refetch}
        activityData={activityData}
        isExpert={isExpert}
        fixedOrMobieTypeByExpert={fixedOrMobieTypeByExpert}
      />
    </>
  );
};

export { Capacity };
