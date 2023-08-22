import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyManagerJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Manager/ManagerList/CountyManagerJobRequestList";

const CountyManagerJobRequestsListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل شهرستانی"
      />
      <CountyManagerJobRequestList />
    </>
  );
};

export { CountyManagerJobRequestsListPage };
