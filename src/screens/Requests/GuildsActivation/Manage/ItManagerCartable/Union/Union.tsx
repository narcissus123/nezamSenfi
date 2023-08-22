import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionItManagerCartable } from "../../../../../../components/Requests/GuildsUnionActivation/Manage/ItManagerCartable/Union/Union";

const UnionScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست اتحادیه"
      />
      <UnionItManagerCartable />
    </>
  );
};

export { UnionScreen };
