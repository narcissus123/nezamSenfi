import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InspectionTypeContainer } from "../../../../components/Settings/Finance/InspectionTypeContainer/InspectionTypeContainer";

const InspectionType: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مالی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درصد تعرفه هکتاری"
      />
      <InspectionTypeContainer />
    </>
  );
};

export { InspectionType };
