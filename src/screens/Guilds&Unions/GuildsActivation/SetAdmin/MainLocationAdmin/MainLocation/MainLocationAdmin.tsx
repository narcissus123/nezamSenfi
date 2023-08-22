import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationAdmin } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/MainLocationAdmin/MainLocation";

const MainLocationAdminScreen = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت ادمین کشوری"
      />
      <MainLocationAdmin />
    </>
  );
};

export { MainLocationAdminScreen };
