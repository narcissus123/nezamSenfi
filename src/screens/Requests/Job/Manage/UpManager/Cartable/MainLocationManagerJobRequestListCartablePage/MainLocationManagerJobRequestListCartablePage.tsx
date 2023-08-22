import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationManagerJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/UpManager/Cartable/MainLocationManagerJobRequestListCartable/MainLocationSecretariatJobRequestListCartable";

const MainLocationManagerJobRequestListCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل کشوری"
      />
      <MainLocationManagerJobRequestListCartable />
    </>
  );
};

export { MainLocationManagerJobRequestListCartablePage };
