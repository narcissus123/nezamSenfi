import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper";
import { AddProduction } from "./AddProduction/AddProduction";
import { ListProduction } from "./ListProduction";

const ProductsContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت محصولات">
        <AddProduction />
      </AdminProductsWrapper>
      <AdminProductsWrapper text="لیست محصولات">
        <ListProduction />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductsContainer };
