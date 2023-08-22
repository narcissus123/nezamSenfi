import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceSecretariatJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/Cartable/ProvinceSecretariatJobRequestListCartable/ProvinceSecretariatJobRequestListCartable";

const ProvinceSecretariatJobRequestListCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل دبیرخانه استانی"
      />
      <ProvinceSecretariatJobRequestListCartable />
    </>
  );
};

export { ProvinceSecretariatJobRequestListCartablePage };
