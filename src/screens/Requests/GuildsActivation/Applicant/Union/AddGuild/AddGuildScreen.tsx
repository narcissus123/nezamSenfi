import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AddGuild } from "../../../../../../components/Requests/GuildsUnionActivation/Applicant/Union/AddGuild/AddGuild";

const AddGuildScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست اتحادیه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست اتحادیه"
      />
      <AddGuild />
    </>
  );
};

export { AddGuildScreen };
