import * as React from "react";
import { ProductsContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ProductsContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminProducts: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="محصولات"
      />
      <ProductsContainer />
    </>
  );
};

export { AdminProducts };
