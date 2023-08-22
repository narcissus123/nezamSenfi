import React, { FC } from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetCountyPolygon } from "../../../components/Settings/SetCountyPolygon";

const SetCountyPolygonPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تنظیمات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تنظیم نقشه شهرستان"
      />

      <SetCountyPolygon />
    </>
  );
};

export { SetCountyPolygonPage };
