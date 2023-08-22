import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceManagerJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/UpManager/Cartable/ProvinceManagerJobRequestListCartable/ProvinceManagerJobRequestListCartable";

const ProvinceManagerJobRequestListCartablePage: FC = () => {
  return (
    <>
      {" "}
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل استانی"
      />
      <ProvinceManagerJobRequestListCartable />
    </>
  );
};

export { ProvinceManagerJobRequestListCartablePage };
