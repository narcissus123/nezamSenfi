import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper";
import { AddDependencyType } from "./AddDependencyType";

const DependencyTypeContainer: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت وابستگی عامل تولید">
        <AddDependencyType />
      </AdminProductsWrapper>
    </>
  );
};

export { DependencyTypeContainer };
