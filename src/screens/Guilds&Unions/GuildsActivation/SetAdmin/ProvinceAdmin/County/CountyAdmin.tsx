import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { County } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/ProvinceAdmin/County"

const CountyAdminScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت ادمین شهرستانی"
      />
      <County />
    </>
  );
};

export { CountyAdminScreen };
