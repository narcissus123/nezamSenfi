import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { NewContainer } from "../../../../../../components/Requests/ChangePersonalInfoContainer/Applicant/NewRequest/NewContainer/NewContainer";

const New = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تغییر اطلاعات هویتی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive=" درخواست تغییر اطلاعات هویتی جدید"
      />
      <NewContainer />
    </>
  );
};

export { New };
