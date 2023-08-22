import * as React from "react";
import { WaterWellCoverageContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminFacilities/WaterWellCoverageContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminWaterWellCoverage: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="قطعات و تأسیسات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="انواع جداره چاه آب"
      />
      <WaterWellCoverageContainer />
    </>
  );
};

export { AdminWaterWellCoverage };
