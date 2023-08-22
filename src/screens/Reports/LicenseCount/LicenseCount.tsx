import * as React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { LicenseCount as LicenseCountContainer } from "../../../components/Reports/LicenseCount/LicenseCount";

const LicenseCount: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="گزارش"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="گزارش تعداد پروانه"

      />
      <LicenseCountContainer />
    </>
  );
};

export { LicenseCount };
