import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceSecretariatCartable } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Secretariat/Cartable/ProvinceSecretariatCartable/ProvinceSecretariatCartable";

const ProvinceScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی استانی"
      />
      <ProvinceSecretariatCartable />
    </>
  );
};

export { ProvinceScreen };
