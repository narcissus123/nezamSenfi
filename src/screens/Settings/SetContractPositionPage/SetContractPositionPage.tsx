import React, { FC } from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetContractPosition } from "../../../components/Settings/SetContractPosition";

const SetContractPositionPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تنظیم قرارداد"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تنظیم قرارداد"
      />
      <SetContractPosition />
    </>
  );
};

export { SetContractPositionPage };
