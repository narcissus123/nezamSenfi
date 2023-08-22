import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceManagerJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Manager/ManagerList/ProvinceManagerJobRequestList/ProvinceManagerJobRequestList";

const ProvinceManagerJobRequestsListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل استانی"
      />
      <ProvinceManagerJobRequestList />
    </>
  );
};

export { ProvinceManagerJobRequestsListPage };
