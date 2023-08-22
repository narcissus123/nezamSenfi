import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { PayableValueContainer } from "../../../../components/Settings/Finance/PayableValueContainer/PayableValueContainer";

const PayableValue: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مالی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="سقف مبالغ"
      />
      <PayableValueContainer />
    </>
  );
};

export { PayableValue };
