import * as React from "react";
import { AdminServicesTypesContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminServicesTools/AdminServicesTypesContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminServicesTypes: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ادوات و خدمات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="انواع ادوات و خدمات"
      />
      <AdminServicesTypesContainer />
    </>
  );
};

export { AdminServicesTypes };
