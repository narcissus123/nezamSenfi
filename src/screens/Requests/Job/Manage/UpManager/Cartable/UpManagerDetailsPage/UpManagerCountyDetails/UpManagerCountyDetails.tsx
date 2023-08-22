import * as React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyManagerDetails } from "../../../../../../../../components/Requests/Job/Manage/UpManager/Cartable/CountyManagerJobRequestListCartable/CountyManagerDetails/CountyManagerDetails";

const UpManagerCountyDetails: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های شهرستانی"
        breadCrumbActive="جزییات درخواست"
      />
      <CountyManagerDetails />
    </>
  );
};

export { UpManagerCountyDetails };
