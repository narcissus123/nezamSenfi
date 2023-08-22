import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { New as NewContainer } from "../../../../../../../components/Requests/License/Issued/Applicant/NewLicense/New/New";

const New = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست پروانه جدید"
      />

      <NewContainer />
    </>
  );
};

export { New };
