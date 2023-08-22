import * as React from "react";
import { SeedlingPreparationCenterContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminProducts/SeedlingPreparationCenterContainer/SeedlingPreparationCenterContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminSeedlingPreparationCenter: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات محصولات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مراکز تهییه نهال / بذر"
      />
      <SeedlingPreparationCenterContainer />
    </>
  );
};

export { AdminSeedlingPreparationCenter };
