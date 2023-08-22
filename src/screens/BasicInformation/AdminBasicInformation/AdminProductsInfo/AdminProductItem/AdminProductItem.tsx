import * as React from "react";
import { ProductsItmsContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ProductsItmsContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminProductItem: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ارقام"
      />
      <ProductsItmsContainer />
    </>
  );
};

export { AdminProductItem };
