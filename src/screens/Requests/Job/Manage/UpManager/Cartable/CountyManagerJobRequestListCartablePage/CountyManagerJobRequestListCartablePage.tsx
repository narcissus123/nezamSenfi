import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyManagerJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/UpManager/Cartable/CountyManagerJobRequestListCartable/CountyManagerJobRequestListCartable";

const CountyManagerJobRequestListCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل شهرستانی"
      />
      <CountyManagerJobRequestListCartable />
    </>
  );
};

export { CountyManagerJobRequestListCartablePage };
