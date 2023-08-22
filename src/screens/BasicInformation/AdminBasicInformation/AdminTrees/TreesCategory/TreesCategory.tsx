import * as React from "react";
import { TreesCategoryContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/Trees/TreesCategoryContainer/TreesCategoryContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const TreesCategory: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات اولیه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت دسته بندی درختان"
      />
      <TreesCategoryContainer />
    </>
  );
};

export { TreesCategory };
