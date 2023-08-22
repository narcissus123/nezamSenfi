import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union as UnionScreen } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/CountyAdmin/Union"

const Union = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت ادمین"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت ادمین اتحادیه"
      />
      <UnionScreen />
    </>
  );
};

export { Union };
