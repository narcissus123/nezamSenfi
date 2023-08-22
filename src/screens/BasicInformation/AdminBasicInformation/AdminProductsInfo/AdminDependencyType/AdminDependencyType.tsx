import * as React from "react";
import { DependencyTypeContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/DependencyTypeContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminDependencyType: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="وابستگی عامل تولید"
      />
      <DependencyTypeContainer />
    </>
  );
};

export { AdminDependencyType };
