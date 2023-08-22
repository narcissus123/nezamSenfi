import * as React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceManagerDetails } from "../../../../../../../../components/Requests/Job/Manage/UpManager/Cartable/ProvinceManagerJobRequestListCartable/ProvinceManagerDetails/ProvinceManagerDetails";

const UpManagerProvinceDetails: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های استانی"
        breadCrumbActive="جزییات درخواست"
      />
      <ProvinceManagerDetails />
    </>
  );
};

export { UpManagerProvinceDetails };
