import React, { FC } from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CostManagementContainer } from "../../../components/Settings/CostManagementContainer/CostManagementContainer";


const CostManagement: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت هزینه ها"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت هزینه ها"
      />
      <CostManagementContainer />
    </>
  );
};

export { CostManagement };
