import * as React from "react";
import BreadCrumbs from "../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { MainLocation } from "../../../../../../../../components/Requests/Job/Manage/Secretariat/CheckJobRequests/MainLocation/MainLocation";

const ManagerJobRequestsCheck: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های کشوری"
        breadCrumbActive="جزییات درخواست"
      />
      <MainLocation isManagerCartable />
    </>
  );
};

export { ManagerJobRequestsCheck };
