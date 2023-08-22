import React, { useState, useContext } from "react";

export const refetchContext = React.createContext<any>(null);

export const useRefetchState = () => {
  const pc = useContext(refetchContext);
  if (pc === null) {
    throw new Error("useRefetchState Must be inside of Provider");
  }
  return pc;
};

const RefetchProvider: React.FC = ({ children }) => {
  const [refetchEvent, setRefetchEvent] = useState({
    provinceGuildUser: false,
    mainlocationGuildUser: false,
    countyGuildUser: false,
    countyGuildList: false,
    unionUserList: false,
    newUnionList: false,
    countyJobRequestList: false,
    unionJobRequestList: false,
    provinceJobRequestList: false,
    mainLocationJobRequestList: false,
    jobResumeList: false,
    provinceSelectJob: false,
    countyRejectJob: false,
    countyConfirmJob: false,
    organizationList: false,
    inqueryList: false,
    provinceAdminRemove: false,
    countyAdminRemove: false,
    unionAdminRemove: false,
    productionUnitList: false,
    ActivityMeasurementUnitList: false,
    productionFactorList: false,
    productionList: false,
    productionFigureList: false,
    profileRefetch: false,
    sectionProximityList: false,
    waterWellList: false,
    engineMotorList: false,
    engineTypeList: false,
    buildingTypeList: false,
    seedlingPreparationCenter: false,
    unreadTickets: false,
    jahadCenterList: false,
    jahadCenterUsers: false,
    costManagementList: false,
    updateLicenseDetails: false,
    notificationHistoryList: false,
    activeUpManagerHistoryList: false,
    realUserJobInfoList: false,
    productionCategoryList: false,
    cancelationReasonList: false,
    rolesContainerList: false,
    payableValueList: false,
    fixedPayableValueList: false,
    tariffList: false,
    maxPayableValueList: false,
    jobCategoryTariffList: false,
    treesCategoryList: false,
    treeList: false,
  }); 


  return (
    <refetchContext.Provider
      value={{
        refetchEvent,
        setRefetchEvent: (val: any) => {
          setRefetchEvent(val);
        },
      }}
    >
      {children}
    </refetchContext.Provider>
  );
};

export { RefetchProvider };
