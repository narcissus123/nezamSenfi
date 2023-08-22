import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MatchingContainer } from "../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/MatchingContainer/MatchingContainer";

const Matching: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="کارتابل من"
        parentLink="/ManageLicense/IssuingResponsible/MyCartable"
        breadCrumbActive="تطبیق"
      />
      <MatchingContainer />
    </>
  );
};

export { Matching };
