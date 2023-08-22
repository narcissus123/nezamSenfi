import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union } from "../../../../../../../components/Requests/GuildsUnionActivation/Manage/CheckGuildsActivation/Union/Union";

const UnionScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        parentLink2="/GuildsActivation/UnionSecretariatGuildActivation"
        breadCrumbActive="جزییات درخواست"
      />
      <Union />
    </>
  );
};

export { UnionScreen };
