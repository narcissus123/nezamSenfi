import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetSecretariatNumber } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/SetSecretariatNumber/SetSecretariatNumber";

const SetUnionSecretariatNumberPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ثبت شماره دبیرخانه و بایگانی"
        breadCrumbParent="کارتابل دبیرخانه"
        parentLink="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="ثبت شماره دبیرخانه و بایگانی"
      />
      <SetSecretariatNumber />
    </>
  );
};

export { SetUnionSecretariatNumberPage };
