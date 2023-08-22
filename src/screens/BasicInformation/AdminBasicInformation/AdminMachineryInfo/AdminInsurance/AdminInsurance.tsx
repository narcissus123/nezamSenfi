import * as React from "react";
import { AdminInsuranceContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminMacineryTools/AdminInsuranceContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminInsurance: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ماشین آلات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت بیمه ها"
      />
      <AdminInsuranceContainer />
    </>
  );
};

export { AdminInsurance };
