import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetDistrictCourtResult } from "../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/SetDistrictCourtResult";

const SetDistrictCourtResultPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="بررسی جواب هیات بدوی"
      />
      <SetDistrictCourtResult />
    </>
  );
};

export { SetDistrictCourtResultPage };
