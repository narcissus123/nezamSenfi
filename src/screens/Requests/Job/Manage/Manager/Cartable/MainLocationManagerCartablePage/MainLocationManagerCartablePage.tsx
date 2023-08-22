import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationManagerCartable } from "../../../../../../../components/Requests/Job/Manage/Manager/Cartable/MainLocationManagerCartable/MainLocationManagerCartable";

const MainLocationManagerCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل کشوری"
      />
      <MainLocationManagerCartable />
    </>
  );
};

export { MainLocationManagerCartablePage };
