import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Province } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Manager/GuildActivationList/Province/Province";

const ProvinceScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های نظام صنفی استانی"
      />
      <Province />
    </>
  );
};

export { ProvinceScreen };
