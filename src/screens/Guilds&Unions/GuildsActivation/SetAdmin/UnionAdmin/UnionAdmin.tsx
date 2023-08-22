import React, { FC } from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union } from "../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/UnionAdmin/Union/";

const UnionAdminScreen: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست ادمین اتحادیه"
      />
      <Union />
    </>
  );
};

export { UnionAdminScreen };
