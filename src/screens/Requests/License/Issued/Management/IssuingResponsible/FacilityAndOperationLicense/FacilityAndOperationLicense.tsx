import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { FacilityAndOperationLicense as FacilityAndOperationLicenseContainer } from "../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/FacilityAndOperationLicense/FacilityAndOperationLicense";

const FacilityAndOperationLicense = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingManager/MyCartable"
        breadCrumbActive="اطلاعات مجوز بهره برداری"
      />
      <FacilityAndOperationLicenseContainer />
    </>
  );
};

export { FacilityAndOperationLicense };
