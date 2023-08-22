import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetPrimaryInfo } from "../../../../../../../components/Requests/License/Issued/Management/ExpertContainer/SetPrimaryInfo/SetPrimaryInfo";

const SetPrimaryInfoPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل کارشناس"
        parentLink="/ManageLicense/MyCartable"
        breadCrumbActive="کارشناسی پروانه"
      />
      <SetPrimaryInfo />
    </>
  );
};

export { SetPrimaryInfoPage };
