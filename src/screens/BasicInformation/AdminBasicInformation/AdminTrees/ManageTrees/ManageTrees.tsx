import * as React from "react";
import { ManageTreesContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/Trees/ManageTreesContainer/ManageTreesContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const ManageTrees: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات اولیه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت درختان"
      />
      <ManageTreesContainer />
    </>
  );
};

export { ManageTrees };
