import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { County } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/CheckGuildsActivation/County/County";

const CountyScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        parentLink2="/GuildsActivation/CountySecretariatGuildActivation"
        breadCrumbActive="جزییات درخواست"
      />
      <County />
    </>
  );
};

export { CountyScreen };
