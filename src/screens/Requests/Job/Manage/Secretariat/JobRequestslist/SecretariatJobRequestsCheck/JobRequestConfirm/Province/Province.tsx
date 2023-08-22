import * as React from "react";
import BreadCrumbs from "../../../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { Province } from "../../../../../../../../../components/Requests/Job/Manage/Secretariat/CheckJobRequests/Province/Province";

const SecretariatJobRequestsCheck: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مدیریت درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست های استانی"
        parentLink2="/ManageCartable/ProvinceJobRequestCartable"
        breadCrumbActive="جزییات درخواست"
      />
      <Province isSecretariatCartable />
    </>
  );
};

export { SecretariatJobRequestsCheck };
