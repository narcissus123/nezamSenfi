import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper/AdminProductsWrapper";
import { ProductsEdit } from "./ProductsEdit";

const ProductionFactorEditContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="بروزرسانی عوامل تولید">
        <ProductsEdit />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductionFactorEditContainer };
