import * as React from "react";
import { AdminMachineManufacturerContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminMacineryTools/AdminMachineManufacturerContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminMachineManufacturer: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ماشین آلات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="شرکت های سازنده"
      />
      <AdminMachineManufacturerContainer />
    </>
  );
};

export { AdminMachineManufacturer };
