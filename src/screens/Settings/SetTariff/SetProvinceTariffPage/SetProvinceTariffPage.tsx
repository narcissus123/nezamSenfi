import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetProvinceTariff } from "../../../../components/Settings/SetTariff/SetProvinceTariff";

const SetProvinceTariffPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تعرفه جذب"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تعرفه جذب استانی"
      />
      <SetProvinceTariff />
    </>
  );
};

export { SetProvinceTariffPage };
