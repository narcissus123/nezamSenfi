import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InspectionDetails } from "../../../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/MatchingContainer/InspectionDetails/InspectionDetails";

const InspectionDetailsPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="جزییات کارشناسی پروانه"
      />
      <InspectionDetails />
    </>
  );
};

export { InspectionDetailsPage };
