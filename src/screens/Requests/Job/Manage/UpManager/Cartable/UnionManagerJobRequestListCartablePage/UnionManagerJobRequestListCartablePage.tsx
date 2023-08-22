import React, { FC } from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionManagerJobRequestListCartable } from "../../../../../../../components/Requests/Job/Manage/UpManager/Cartable/UnionManagerJobRequestListCartable/UnionSecretariatJobRequestListCartable";

const UnionManagerJobRequestListCartablePage: FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های شغل اتحادیه"
      />
      <UnionManagerJobRequestListCartable />
    </>
  );
};

export { UnionManagerJobRequestListCartablePage };
