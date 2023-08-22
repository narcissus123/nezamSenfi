import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvincePositionSetting as ProvincePositionSettingComponent } from "../../../../components/Settings/PositionSetting/ProvincePositionSetting";

const ProvincePositionSetting: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات شغل استانی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اختصاص شغل استانی"
      />
      <ProvincePositionSettingComponent />
    </>
  );
};

export { ProvincePositionSetting };
