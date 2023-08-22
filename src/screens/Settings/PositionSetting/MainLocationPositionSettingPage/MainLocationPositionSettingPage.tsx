import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationPositionSetting } from "../../../../components/Settings/PositionSetting/MainLocationPositionSetting/MainLocationPositionSetting";

const MainLocationPositionSettingPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات شغل کشوری"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اختصاص شغل کشوری"
      />
      <MainLocationPositionSetting />
    </>
  );
};

export { MainLocationPositionSettingPage };
