import * as React from "react";
import { AdminMacineTypesContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminMacineryTools/AdminMacineTypesContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminMacineTypes: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ماشین آلات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="انواع ماشین آلات"
      />
      <AdminMacineTypesContainer />
    </>
  );
};

export { AdminMacineTypes };
