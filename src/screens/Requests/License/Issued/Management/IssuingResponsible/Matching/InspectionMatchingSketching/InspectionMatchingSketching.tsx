import React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InspectionMatchingSketchingContainer } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/MatchingContainer/InspectionMatchingSketchingContainer/InspectionMatchingSketchingContainer";

const InspectionMatchingSketching = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="ثبت کروکی"
      />
      <InspectionMatchingSketchingContainer />
    </>
  );
};

export { InspectionMatchingSketching };
