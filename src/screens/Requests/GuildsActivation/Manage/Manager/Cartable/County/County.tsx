import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyManagerCartable } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Manager/Cartable/CountyManagerCartable/CountyManagerCartable";

const CountyScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی شهرستانی"
      />
      <CountyManagerCartable />
    </>
  );
};

export { CountyScreen };
