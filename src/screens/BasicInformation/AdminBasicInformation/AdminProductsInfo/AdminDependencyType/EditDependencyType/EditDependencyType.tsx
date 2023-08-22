import * as React from "react";
import { EditDependencyType as EditDependencyTypeContainer } from "../../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/DependencyTypeContainer/EditDependencyType/EditDependencyType";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";


const EditDependencyType: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ویرایش وابستگی عامل تولید"
      />
      <EditDependencyTypeContainer />
    </>
  );
};

export { EditDependencyType };
