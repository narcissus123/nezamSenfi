import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceItManagerCartable } from "../../../../../../components/Requests/GuildsUnionActivation/Manage/ItManagerCartable/Province/Province";

const ProvinceScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست نظام صنفی استانی"
      />
      <ProvinceItManagerCartable />
    </>
  );
};

export { ProvinceScreen };
