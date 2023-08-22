import React, { FC } from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { RolesContainer } from "../../../../components/Settings/Finance/RolesContainer/RolesContainer";

const Roles: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مالی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="تقسیم وظایف"
      />
      <RolesContainer />
    </>
  );
};

export { Roles };
