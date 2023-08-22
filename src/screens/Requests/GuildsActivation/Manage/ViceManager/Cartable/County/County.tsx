import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { County } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/ViceManager/Cartable/County/County";

const CountyScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی شهرستانی"
      />
      <County />
    </>
  );
};

export { CountyScreen };
