import React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InspectionMatchingLocationPlanContainer } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/MatchingContainer/InspectionMatchingLocationPlan/InspectionMatchingLocationPlan";

const InspectionMatchingLocationPlan = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="ثبت پلان موقعیت قطعه"
      />
      <InspectionMatchingLocationPlanContainer />
    </>
  );
};

export { InspectionMatchingLocationPlan };
