import * as React from "react";
import { AdminMachineContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminMacineryTools/AdminMachineContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminMachineTools: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ماشین آلات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت ماشین ها"
      />
      <AdminMachineContainer />
    </>
  );
};

export { AdminMachineTools };
