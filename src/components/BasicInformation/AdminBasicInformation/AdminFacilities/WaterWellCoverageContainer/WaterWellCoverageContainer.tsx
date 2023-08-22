import React, { useContext, useState } from "react";
import { FacilitiesWrapper } from "../FacilitiesWrapper";
import { AddListWaterWellCoverage } from "./AddListWaterWellCoverage";
import { ListWaterWellCoverage } from "./ListWaterWellCoverage";

export interface IAdminMachineContext {
  fetchRefresh: boolean;
  setFetchRefresh: any;
}

const AdminServicesTypesContext = React.createContext<IAdminMachineContext | null>(
  null
);

export const useServicesTypesContext = () => {
  const pc = useContext(AdminServicesTypesContext);
  if (pc === null) {
    throw new Error("useRegisterContext Must be inside of Provider");
  }
  return pc;
};

const WaterWellCoverageContainer: React.FC = () => {
  const [fetchRefresh, setFetchRefresh] = useState<boolean>(false);

  return (
    <>
      <AdminServicesTypesContext.Provider
        value={{
          fetchRefresh,
          setFetchRefresh: () => setFetchRefresh((prev) => !prev),
        }}
      >
        <FacilitiesWrapper text="ثبت و مدیریت انواع جداره چاه اب">
          <AddListWaterWellCoverage />
        </FacilitiesWrapper>
        <FacilitiesWrapper text="لیست انواع جداره چاه اب">
          <ListWaterWellCoverage />
        </FacilitiesWrapper>
      </AdminServicesTypesContext.Provider>
    </>
  );
};

export { WaterWellCoverageContainer };
