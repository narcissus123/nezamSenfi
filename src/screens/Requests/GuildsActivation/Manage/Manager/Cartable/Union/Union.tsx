import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionManagerCartable } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Manager/Cartable/UnionManagerCartable/UnionManagerCartable";

const UnionScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست اتحادیه"
      />
      <UnionManagerCartable />
    </>
  );
};

export { UnionScreen };
