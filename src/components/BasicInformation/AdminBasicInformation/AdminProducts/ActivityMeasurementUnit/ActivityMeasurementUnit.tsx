import React from "react";
import { AdminProductsWrapper } from "../AdminProductsWrapper/AdminProductsWrapper";
import { AddActivityMeasurementUnit } from "./AddActivityMeasurementUnit/AddActivityMeasurementUnit";
import { ListActivityMeasurementUnit } from "./ListActivityMeasurementUnit/ListActivityMeasurementUnit";

const ActivityMeasurementUnit: React.FC = () => {
  return (
    <>
      <AdminProductsWrapper text="ثبت و مدیریت واحد های اندازه گیری فعالیت">
        <AddActivityMeasurementUnit />
      </AdminProductsWrapper>
      <AdminProductsWrapper text="لیست واحد های اندازه گیری فعالیت">
        <ListActivityMeasurementUnit />
      </AdminProductsWrapper>
    </>
  );
};

export { ActivityMeasurementUnit };
