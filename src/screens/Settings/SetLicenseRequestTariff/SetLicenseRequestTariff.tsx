import React, { FC } from "react";
import { SetLicenseRequestTariff as SetLicenseRequestTariffContainer  } from "../../../components/Settings/SetLicenseRequestTariff/SetLicenseRequestTariff";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const SetLicenseRequestTariff: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تعرفه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تعرفه درخواست پروانه"
      />
      <SetLicenseRequestTariffContainer />
    </>
  );
};

export { SetLicenseRequestTariff };
