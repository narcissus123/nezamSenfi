import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyItManagerCartable } from "../../../../../../components/Requests/GuildsUnionActivation/Manage/ItManagerCartable/County/County";

const CountyScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی شهرستانی"
      />
      <CountyItManagerCartable />
    </>
  );
};

export { CountyScreen };
