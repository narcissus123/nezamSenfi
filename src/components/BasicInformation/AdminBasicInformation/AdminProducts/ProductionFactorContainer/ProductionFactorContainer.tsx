import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper";
import { AddProductionFactor } from "./AddProductionFactor";
import { ListProductionFactor } from "./ListProductionFactor";

const ProductionFactorContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت عوامل تولید">
        <AddProductionFactor />
      </AdminProductsWrapper>
      <AdminProductsWrapper text="لیست عوامل تولید">
        <ListProductionFactor />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductionFactorContainer };
