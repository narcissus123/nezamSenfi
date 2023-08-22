import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/Manager/GuildActivationList/Union/Union";

const UnionScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های اتحادیه"
      />
      <Union />
    </>
  );
};

export { UnionScreen };
