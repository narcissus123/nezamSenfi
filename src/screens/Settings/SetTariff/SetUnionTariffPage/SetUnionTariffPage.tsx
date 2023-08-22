import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { SetUnionTariff } from "../../../../components/Settings/SetTariff/SetUnionTariff";

const SetUnionTariffPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تعرفه جذب"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تعرفه جذب اتحادیه"
      />
      <SetUnionTariff />
    </>
  );
};

export { SetUnionTariffPage };
