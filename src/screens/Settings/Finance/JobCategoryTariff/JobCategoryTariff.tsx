import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { JobCategoryTariffContainer } from "../../../../components/Settings/Finance/JobCategoryTariffContainer/JobCategoryTariffContainer";

const JobCategoryTariff: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مالی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تعرفه گروه شغلی"
      />
      <JobCategoryTariffContainer />
    </>
  );
};

export { JobCategoryTariff };
