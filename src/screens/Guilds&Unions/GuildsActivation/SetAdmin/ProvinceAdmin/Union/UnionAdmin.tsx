import React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union } from "../../../../../../components/Guilds&UnionsContainer/GuildsUnionActivation/SetAdmin/ProvinceAdmin/Union/"

const UnionAdmin = () => {
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

export { UnionAdmin };
