import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { County as CountyScreen } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/CountyAdmin/County";

const County = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست ادمین شهرستانی"
      />
      <CountyScreen />
    </>
  );
};

export { County };
