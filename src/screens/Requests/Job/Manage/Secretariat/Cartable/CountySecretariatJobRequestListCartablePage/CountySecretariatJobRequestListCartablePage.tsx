import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountySecretariatJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/Cartable/CountySecretariatJobRequestListCartable/CountySecretariatJobRequestListCartable";

const CountySecretariatJobRequestListCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل دبیرخانه شهرستانی"
      />
      <CountySecretariatJobRequestListCartable />
    </>
  );
};

export { CountySecretariatJobRequestListCartablePage };
