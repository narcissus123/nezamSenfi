import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyManagerCartable } from "../../../../../../../components/Requests/Job/Manage/Manager/Cartable/CountyManagerCartable/CountyManagerCartable";

const CountyManagerCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل شهرستانی"
      />
      <CountyManagerCartable />
    </>
  );
};

export { CountyManagerCartablePage };
