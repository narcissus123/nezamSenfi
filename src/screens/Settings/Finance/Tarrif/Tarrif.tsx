import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { TarrifContainer } from "../../../../components/Settings/Finance/TarrifContainer";

const Tarrif: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مالی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تعرفه"
      />
      <TarrifContainer />
    </>
  );
};

export { Tarrif };
