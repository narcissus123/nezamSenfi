import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionSecretariatJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/Secretariat/Cartable/Cartable/UnionSecretariatJobRequestListCartable/UnionSecretariatJobRequestListCartable";

const UnionSecretariatJobRequestListCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل دبیرخانه اتحادیه"
      />
      <UnionSecretariatJobRequestListCartable />
    </>
  );
};

export { UnionSecretariatJobRequestListCartablePage };
