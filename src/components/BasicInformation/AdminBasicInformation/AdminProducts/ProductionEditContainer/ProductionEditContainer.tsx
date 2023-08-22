import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper/AdminProductsWrapper";
import { ProductsEdit } from "./ProductsEdit";

const ProductionEditContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="بروزرسانی محصولات">
        <ProductsEdit />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductionEditContainer };
