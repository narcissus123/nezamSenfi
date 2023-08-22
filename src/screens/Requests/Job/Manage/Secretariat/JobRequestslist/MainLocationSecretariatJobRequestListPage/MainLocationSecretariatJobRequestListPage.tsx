import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocationSecretariatJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Secretariat/JobRequestslist/MainLocationSecretariatJobRequestList/MainLocationSecretariatJobRequestList";

const MainLocationSecretariatJobRequestListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل کشوری"
      />
      <MainLocationSecretariatJobRequestList />
    </>
  );
};

export { MainLocationSecretariatJobRequestListPage };
