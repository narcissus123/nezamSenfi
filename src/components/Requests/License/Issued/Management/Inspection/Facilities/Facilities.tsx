import React from "react";
import { FacilitiesForm } from "./FacilitiesForm";

interface IPropTypes {
  refetch: any;
  facilityData: any;
  facilityDataIsFetching: any;
  buildingsData: any;
  getSection: any;
  isExpert?: boolean;
}
const Facilities: React.FC<IPropTypes> = ({
  refetch,
  facilityData,
  facilityDataIsFetching,
  buildingsData,
  getSection,
  isExpert = true,
}) => {
  return (
    <>
      <FacilitiesForm
        buildingsData={buildingsData}
        facilityDataIsFetching={facilityDataIsFetching}
        refetch={refetch}
        facilityData={facilityData}
        isExpert={isExpert}
        getSection={getSection}
      />
    </>
  );
};

export { Facilities };
