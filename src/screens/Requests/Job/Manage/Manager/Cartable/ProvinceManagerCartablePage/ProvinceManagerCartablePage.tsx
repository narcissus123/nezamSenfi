import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceManagerCartable } from "../../../../../../../components/Requests/Job/Manage/Manager/Cartable/ProvinceManagerCartable/ProvinceManagerCartable";

const ProvinceManagerCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل استانی"
      />
      <ProvinceManagerCartable />
    </>
  );
};

export { ProvinceManagerCartablePage };
