import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { GuildList } from "../../../../../../components/Requests/GuildsUnionActivation/Applicant/County/List/GuildList";

const GuildListScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="لیست درخواست اصناف"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست درخواست صنف شهرستانی"
      />
      <GuildList />
    </>
  );
};

export { GuildListScreen };
