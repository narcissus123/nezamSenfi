import React from "react";
import { AdminProductsWrapper } from "../../AdminProductsWrapper/AdminProductsWrapper";
import { ProductsCategoryEdit } from "./ProductsCategoryEdit/ProductsCategoryEdit";

const ProductsCategoryEditContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ویرایش">
        <ProductsCategoryEdit />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductsCategoryEditContainer };
