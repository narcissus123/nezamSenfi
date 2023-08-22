import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { FixedPayableValueContainer } from "../../../../components/Settings/Finance/FixedPayableValueContainer/FixedPayableValueContainer";


const FixedPayableValueMainLocation: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مالی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ردیف مالی تعرفه"
      />
      <FixedPayableValueContainer type="mainlocation" />
    </>
  );
};

export { FixedPayableValueMainLocation };
