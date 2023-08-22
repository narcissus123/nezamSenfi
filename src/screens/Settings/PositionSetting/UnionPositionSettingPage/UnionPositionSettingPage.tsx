import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionPositionSetting } from "../../../../components/Settings/PositionSetting/UnionPositionSetting/UnionPositionSetting";

const UnionPositionSettingPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات شغل اتحادیه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اختصاص شغل اتحادیه"
      />
      <UnionPositionSetting />
    </>
  );
};

export { UnionPositionSettingPage };
