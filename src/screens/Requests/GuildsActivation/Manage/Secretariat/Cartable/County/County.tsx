import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountySecretariatCartable } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Secretariat/Cartable/CountySecretariatCartable/CountySecretariatCartable";

const CountyScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی شهرستانی"
      />
      <CountySecretariatCartable />
    </>
  );
};

export { CountyScreen };
