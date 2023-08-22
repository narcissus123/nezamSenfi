import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Details } from "../../../../../../../components/Requests/License/Issued/Management/JahadContainer/Details";

const DetailsPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/JahadCenterManager/MyCartable"
        breadCrumbActive="جزییات درخواست"
      />
      <Details />
    </>
  );
};

export { DetailsPage };
