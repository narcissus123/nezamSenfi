import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { RequestDetails as RequestDetailsComponent } from "../../../../../../../../components/Requests/License/Issued/Management/SecreteriatContainer/ManageRequest/RequestDetails/RequestDetails";

const RequestDetails: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="جزئیات درخواست"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/Secreteriat/MyCartable"
        breadCrumbActive="جزئیات درخواست"
      />

      <RequestDetailsComponent isFromCartable={true} />
    </>
  );
};

export { RequestDetails };
