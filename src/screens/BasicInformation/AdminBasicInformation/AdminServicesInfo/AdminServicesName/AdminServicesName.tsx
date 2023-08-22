import * as React from "react";
import { AdminServicesNameContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminServicesTools/AdminServicesNameContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminServicesName: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ادوات و خدمات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="نام ادوات و خدمات"
      />
      <AdminServicesNameContainer />
    </>
  );
};

export { AdminServicesName };
