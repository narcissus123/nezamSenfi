import * as React from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { IssuingResponsibleContainer } from "../../../../../components/Requests/License/Cancellation/IssuingResponsibleContainer/IssuingResponsibleContainer";

const IssuingResponsible = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ابطال"
        breadCrumbParent="کارتابل"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="ابطال پروانه"
      />
      <IssuingResponsibleContainer />
    </>
  );
};

export { IssuingResponsible };
