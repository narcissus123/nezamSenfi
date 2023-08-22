import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetCountyTariff } from "../../../../components/Settings/SetTariff/SetCountyTariff";

const SetCountyTariffPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تعرفه جذب"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تعرفه جذب شهرستانی"
      />
      <SetCountyTariff />
    </>
  );
};

export { SetCountyTariffPage };
