import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/ViceManager/Cartable/Union/Union";

const UnionScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست اتحادیه"
      />
      <Union />
    </>
  );
};

export { UnionScreen };
