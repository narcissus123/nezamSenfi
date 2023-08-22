import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper/AdminProductsWrapper";
import { AddProductionUnit } from "./AddProductionUnit/AddProductionUnit";
import { ListProductionUnit } from "./ListProductionUnit";

const ProductsUnitContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت واحد های محصول">
        <AddProductionUnit />
      </AdminProductsWrapper>
      <AdminProductsWrapper text="لیست واحد های محصول">
        <ListProductionUnit />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductsUnitContainer };
