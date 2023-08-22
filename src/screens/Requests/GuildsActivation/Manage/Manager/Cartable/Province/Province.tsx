import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceManagerCartable } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Manager/Cartable/ProvinceManagerCartable/ProvinceManagerCartable";

const ProvinceScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی استانی"
      />
      <ProvinceManagerCartable />
    </>
  );
};

export { ProvinceScreen };
