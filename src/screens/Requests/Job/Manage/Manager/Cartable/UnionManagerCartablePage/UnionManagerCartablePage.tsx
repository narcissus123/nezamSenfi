import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionManagerCartable } from "../../../../../../../components/Requests/Job/Manage/Manager/Cartable/UnionManagerCartable/UnionManagerCartable";

const UnionManagerCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل اتحادیه"
      />
      <UnionManagerCartable />
    </>
  );
};

export { UnionManagerCartablePage };
