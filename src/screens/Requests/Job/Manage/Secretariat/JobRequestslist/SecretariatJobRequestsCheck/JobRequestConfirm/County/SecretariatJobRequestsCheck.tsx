import * as React from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { County } from "../../../../../../../../../components/Requests/Job/Manage/Secretariat/CheckJobRequests/County/County";

const SecretariatJobRequestsCheck: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های شهرستانی"
        parentLink2="/ManageCartable/CountyJobRequestCartable"
        breadCrumbActive="جزییات درخواست"
      />
      <County isSecretariatCartable />
    </>
  );
};

export { SecretariatJobRequestsCheck };
