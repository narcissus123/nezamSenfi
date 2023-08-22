import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetSecretariatNumber } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/SetSecretariatNumber/SetSecretariatNumber";

const SetCountySecretariatNumberPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ثبت شماره دبیرخانه و بایگانی"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="ثبت شماره دبیرخانه و بایگانی"
      />
      <SetSecretariatNumber />
    </>
  );
};

export { SetCountySecretariatNumberPage };
