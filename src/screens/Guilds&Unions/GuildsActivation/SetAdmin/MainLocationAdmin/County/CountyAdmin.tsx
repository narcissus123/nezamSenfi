import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { County } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/MainLocationAdmin/County"

const CountyAdminScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست ادمین شهرستانی"
      />
      <County />
    </>
  );
};

export { CountyAdminScreen };
