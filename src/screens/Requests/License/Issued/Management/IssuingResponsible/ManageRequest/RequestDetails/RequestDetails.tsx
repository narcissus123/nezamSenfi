import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { RequestDetails as RequestDetailsComponent } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/ManageRequest/RequestDetails";

const RequestDetails: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="جزئیات درخواست"
        breadCrumbParent="لیست درخواست ها"
        parentLink="/ManageLicense/IssuingManager/AllRequests"
        breadCrumbActive="جزئیات درخواست"
      />

      <RequestDetailsComponent />
    </>
  );
};

export { RequestDetails };
