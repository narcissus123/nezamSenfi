import * as React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionManagerDetails } from "../../../../../../../../components/Requests/Job/Manage/UpManager/Cartable/UnionManagerJobRequestListCartable/UnionManagerDetails/UnionManagerDetails";

const UpManagerUnionDetails: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های اتحادیه"
        breadCrumbActive="جزییات درخواست"
      />
      <UnionManagerDetails />
    </>
  );
};

export { UpManagerUnionDetails };
