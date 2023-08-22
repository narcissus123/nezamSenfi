import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { RequestDetails as RequestDetailsComponent } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/ManageRequest/RequestDetails/RequestDetails";

const RequestDetails: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="جزئیات درخواست"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="جزئیات درخواست"
      />

      <RequestDetailsComponent isFromCartable={true} />
    </>
  );
};

export { RequestDetails };
