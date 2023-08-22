import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InspectionContainer } from "../../../../../../components/Requests/License/Issued/Management/Inspection/InspectionContainer";

export interface PersonalInfoProps {}

const Inspection: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل کارشناس"
        parentLink="/ManageLicense/MyCartable"
        breadCrumbActive="کارشناسی پروانه"
      />
      <InspectionContainer />
    </>
  );
};

export { Inspection };
