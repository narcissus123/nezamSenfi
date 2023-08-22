import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AddGuild } from "../../../../../../components/Requests/GuildsUnionActivation/Applicant/Province/AddGuild/AddGuild";

const AddGuildScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست صنف"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست صنف استانی"
      />
      <AddGuild />
    </>
  );
};

export { AddGuildScreen };
