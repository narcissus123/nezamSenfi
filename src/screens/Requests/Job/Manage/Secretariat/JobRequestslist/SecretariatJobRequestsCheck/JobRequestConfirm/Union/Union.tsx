import * as React from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union } from "../../../../../../../../../components/Requests/Job/Manage/Secretariat/CheckJobRequests/Union/Union";

const SecretariatJobRequestsCheck: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های اتحادیه"
        parentLink2="/ManageCartable/UnionJobRequestCartable"
        breadCrumbActive="جزییات درخواست"
      />
      <Union isSecretariatCartable />
    </>
  );
};

export { SecretariatJobRequestsCheck };
