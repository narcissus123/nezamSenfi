import * as React from "react";

import { ProductionFactorContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ProductionFactorContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminProductsFactors: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="عوامل تولید"
      />
      <ProductionFactorContainer />
    </>
  );
};

export { AdminProductsFactors };
