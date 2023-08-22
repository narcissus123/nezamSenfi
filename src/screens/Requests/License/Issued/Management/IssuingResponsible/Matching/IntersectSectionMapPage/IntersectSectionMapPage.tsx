import React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { IntersectSectionMap } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/MatchingContainer/IntersectSectionMap/IntersectSectionMap";

const IntersectSectionMapPage = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="نقاط همپوشانی"
      />
      <IntersectSectionMap />
    </>
  );
};

export { IntersectSectionMapPage };
