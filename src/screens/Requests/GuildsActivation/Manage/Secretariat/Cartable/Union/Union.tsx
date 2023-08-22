import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionCartable } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Secretariat/Cartable/UnionCartable/UnionCartable";

const UnionScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل اتحادیه"
      />
      <UnionCartable />
    </>
  );
};

export { UnionScreen };
