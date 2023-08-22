import * as React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MapPointsContainer } from "../../../components/Reports/MapPointsContainer/MapPointsContainer";

const MapPoints: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="گزارش"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="گزارش قطعات روی نقشه"
      />
      <MapPointsContainer />
    </>
  );
};

export { MapPoints };
