import * as React from "react";
import { ProductsCategoryEditContainer } from "../../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/ProductsCategoryContainer/ProductsCategoryEditContainer/ProductsCategoryEditContainer";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminProductCategoryEdit: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="دسته بندی محصولات"
        parentLink="/BasicInformation/Products/ProductsCategory"
        breadCrumbActive="ویرایش دسته بندی محصولات"
      />
      <ProductsCategoryEditContainer />
    </>
  );
};

export { AdminProductCategoryEdit };
