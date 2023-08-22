import React, { FC } from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionList } from "../../../../../../components/Requests/GuildsUnionActivation/Applicant/Union/List/UnionList";

const GuildListScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="لیست درخواست اتحادیه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست درخواست اتحادیه "
      />
      <UnionList />
    </>
  );
};

export { GuildListScreen };
