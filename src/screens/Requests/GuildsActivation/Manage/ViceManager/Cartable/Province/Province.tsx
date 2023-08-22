import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Province } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/ViceManager/Cartable/Province/Province";

const ProvinceScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی استانی"
      />
      <Province />
    </>
  );
};

export { ProvinceScreen };
