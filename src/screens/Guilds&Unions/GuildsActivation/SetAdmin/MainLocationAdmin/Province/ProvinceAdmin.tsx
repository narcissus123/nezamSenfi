import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Province } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/MainLocationAdmin/Province/"

const ProvinceAdminScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت ادمین استانی"
      />
      <Province />
    </>
  );
};

export { ProvinceAdminScreen };
