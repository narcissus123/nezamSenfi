import * as React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { County } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/CheckJobRequests/County/County";

const ManagerJobRequestsCheck: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های شهرستانی"
        breadCrumbActive="جزییات درخواست"
      />
      <County isManagerCartable />
    </>
  );
};

export { ManagerJobRequestsCheck };
