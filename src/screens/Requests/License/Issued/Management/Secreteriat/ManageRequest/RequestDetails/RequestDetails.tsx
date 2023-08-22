import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { RequestDetails as RequestDetailsComponent } from "../../../../../../../../components/Requests/License/Issued/Management/SecreteriatContainer/ManageRequest/RequestDetails";

const RequestDetails: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="جزئیات درخواست"
        breadCrumbParent="لیست درخواست ها"
        parentLink="/ManageLicense/Secreteriat/AllRequests"
        breadCrumbActive="جزئیات درخواست"
      />

      <RequestDetailsComponent />
    </>
  );
};

export { RequestDetails };
