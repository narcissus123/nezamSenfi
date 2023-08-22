import React, { FC } from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ActiveUpLevelManager } from "../../../components/Settings/ActiveUpLevelManager/ActiveUpLevelManager";

const ActiveUpLevelManagerPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات مدیریت"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تنظیمات تاییدیه مدیریت"
      />
      <ActiveUpLevelManager />
    </>
  );
};

export { ActiveUpLevelManagerPage };
