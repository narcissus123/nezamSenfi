import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyPositionSetting } from "../../../../components/Settings/PositionSetting/CountyPositionSetting/CountyPositionSetting";

const CountyPositionSettingPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات شغل شهرستانی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اختصاص شغل شهرستانی"
      />
      <CountyPositionSetting />
    </>
  );
};

export { CountyPositionSettingPage };
