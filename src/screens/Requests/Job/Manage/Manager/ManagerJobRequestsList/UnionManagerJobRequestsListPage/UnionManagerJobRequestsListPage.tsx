import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionManagerJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Manager/ManagerList/UnionManagerJobRequestList/UnionManagerJobRequestList";

const UnionManagerJobRequestsListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل اتحادیه"
      />
      <UnionManagerJobRequestList />
    </>
  );
};

export { UnionManagerJobRequestsListPage };
