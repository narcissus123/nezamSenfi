import * as React from "react";
import { LandAdjacentTypeContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminFacilities/LandAdjacentTypeContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const LandAdjacentType: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="قطعات و تأسیسات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="انواع مجاورت زمین"
      />
      <LandAdjacentTypeContainer />
    </>
  );
};

export { LandAdjacentType };
