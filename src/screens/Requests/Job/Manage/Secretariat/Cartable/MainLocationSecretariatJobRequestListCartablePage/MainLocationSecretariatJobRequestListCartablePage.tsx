import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationSecretariatJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/Cartable/MainLocationSecretariatJobRequestListCartable/MainLocationSecretariatJobRequestListCartable";

const MainLocationSecretariatJobRequestListCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل دبیرخانه کشوری"
      />
      <MainLocationSecretariatJobRequestListCartable />
    </>
  );
};

export { MainLocationSecretariatJobRequestListCartablePage };
