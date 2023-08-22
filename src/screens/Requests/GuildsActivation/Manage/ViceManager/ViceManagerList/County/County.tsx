import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { County } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/ViceManager/ViceManagerList/County/County";

const CountyScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های نظام صنفی شهرستانی"
      />
      <County />
    </>
  );
};

export { CountyScreen };
