import * as React from "react";
import { ProductsCategoryContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ProductsCategoryContainer/ProductsCategoryContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminProductCategory: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="دسته بندی محصولات"
      />
      <ProductsCategoryContainer />
    </>
  );
};

export { AdminProductCategory };
