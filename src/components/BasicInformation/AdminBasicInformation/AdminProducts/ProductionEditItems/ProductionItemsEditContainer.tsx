import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper/AdminProductsWrapper";
import { ProductsEdit } from "./ProductsItemsEdit";

const ProductionItemsEditContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت بخش ها">
        <ProductsEdit />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductionItemsEditContainer };
