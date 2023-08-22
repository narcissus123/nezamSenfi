import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetMainLocationTariff } from "../../../../components/Settings/SetTariff/SetMainLocationTariff";

const SetMainLocationTariffPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تعرفه جذب"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تعرفه جذب کشوری"
      />
      <SetMainLocationTariff />
    </>
  );
};

export { SetMainLocationTariffPage };
