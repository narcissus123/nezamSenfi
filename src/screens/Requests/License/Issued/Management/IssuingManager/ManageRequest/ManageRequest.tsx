import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ManageRequest as ManageRequestContainer } from "../../../../../../../components/Requests/License/Issued/Management/IssuingManager/ManageRequest";

const ManageRequest: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingManager/MyCartable"
        breadCrumbActive="تطبیق"
      />
      <ManageRequestContainer />
    </>
  );
};

export { ManageRequest };
