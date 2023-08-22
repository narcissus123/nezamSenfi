import React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CancelationReasonContainer } from "../../../components/Settings/CancelationReason/CancelationReasonContainer";


const CancelationReason: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ابطال"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="دلایل ابطال"
      />
      <CancelationReasonContainer />
    </>
  );
};

export { CancelationReason };
