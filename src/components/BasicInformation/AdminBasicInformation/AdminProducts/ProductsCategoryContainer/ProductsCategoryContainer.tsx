import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper/AdminProductsWrapper";
import { AddProductionCategory } from "./AddProductionCategory/AddProductionCategory";
import { ListProductionCategory } from "./ListProductionCategory/ListProductionCategory";

const ProductsCategoryContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="لیست دسته بندی محصولات">
        <ListProductionCategory />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductsCategoryContainer };
