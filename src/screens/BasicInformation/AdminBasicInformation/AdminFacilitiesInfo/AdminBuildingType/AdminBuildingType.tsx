import * as React from "react";

import { BuildingTypeContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminFacilities/BuildingTypeContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminBuildingType: React.FC = () => {
  return (
    <>
     <BreadCrumbs
        breadCrumbTitle="قطعات و تأسیسات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="انواع ساختمان و تأسیسات"
      />
      <BuildingTypeContainer />
    </>
  );
};

export { AdminBuildingType };
