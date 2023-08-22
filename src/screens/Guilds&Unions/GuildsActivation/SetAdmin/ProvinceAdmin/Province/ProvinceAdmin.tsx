import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Province } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/ProvinceAdmin/Province"

const ProvinceAdminScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست ادمین استانی"
      />
      <Province />
    </>
  );
};

export { ProvinceAdminScreen };
