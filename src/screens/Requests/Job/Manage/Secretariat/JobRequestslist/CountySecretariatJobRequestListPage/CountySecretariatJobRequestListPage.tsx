import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountySecretariatJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Secretariat/JobRequestslist/CountySecretariatJobRequestList/CountySecretariatJobRequestList";

const CountySecretariatJobRequestListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل شهرستانی"
      />
      <CountySecretariatJobRequestList />
    </>
  );
};

export { CountySecretariatJobRequestListPage };
