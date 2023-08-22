import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionSecretariatJobRequestList } from "../../../../../../../components/Requests/Job/Manage/Secretariat/JobRequestslist/UnionSecretariatJobRequestList/UnionSecretariatJobRequestList";

const UnionSecretariatJobRequestListPage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل اتحادیه"
      />
      <UnionSecretariatJobRequestList />
    </>
  );
};

export { UnionSecretariatJobRequestListPage };
