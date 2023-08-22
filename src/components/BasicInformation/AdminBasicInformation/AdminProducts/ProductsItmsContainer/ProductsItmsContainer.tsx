import React, { useState } from "react";
import { FullOptionSel } from "../../../../../core/models";
import { AdminProductsWrapper } from "../AdminProductsWrapper";
import { AddProductionItems } from "./AddProductionItems";
import { ListProductionItems } from "./ListProductionItems";

const ProductsItmsContainer: React.FC = () => {

  const [productCategories , setProductCategories] = useState<FullOptionSel[]>()

  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت ارقام">
        <AddProductionItems setProductCategories={setProductCategories} />
      </AdminProductsWrapper>
      <AdminProductsWrapper text="لیست ارقام">
        <ListProductionItems productCategories={productCategories} />
      </AdminProductsWrapper>
    </>
  );
};

export { ProductsItmsContainer };
