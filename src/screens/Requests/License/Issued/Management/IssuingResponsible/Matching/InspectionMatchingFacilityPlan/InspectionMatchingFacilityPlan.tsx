import React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InspectionMatchingFacilityPlanContainer } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/MatchingContainer/InspectionMatchingFacilityPlan/InspectionMatchingFacilityPlan";

const InspectionMatchingFacilityPlan = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="ثبت پلان موقعیت قطعه"
      />
      <InspectionMatchingFacilityPlanContainer />
    </>
  );
};

export { InspectionMatchingFacilityPlan };
