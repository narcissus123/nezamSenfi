import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ProvinceSecretariatJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Secretariat/JobRequestslist/ProvinceSecretariatJobRequestList/ProvinceSecretariatJobRequestList";

const ProvinceSecretariatJobRequestListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل استانی"
      />
      <ProvinceSecretariatJobRequestList />
    </>
  );
};

export { ProvinceSecretariatJobRequestListPage };
