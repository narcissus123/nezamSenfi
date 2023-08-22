import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationManagerJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Manager/ManagerList/MainLocationManagerJobRequestList/MainLocationManagerJobRequestList";

const MainLocationManagerJobRequestsListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل کشوری"
      />
      <MainLocationManagerJobRequestList />
    </>
  );
};

export { MainLocationManagerJobRequestsListPage };
