import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ConfirmDocuments } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/ManageRequest/ConfirmDocuments/ConfirmDocuments";

const ConfirmDocumentsPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="بررسی درخواست"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="دریافت اصل اسناد"
      />
      <ConfirmDocuments />
    </>
  );
};

export { ConfirmDocumentsPage };
