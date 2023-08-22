import * as React from "react";
import { JobContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminJobField/JobContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminJob: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="زمینه فعالیت و مشاغل"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="عنوان فعالیت اقتصادی"
      />
      <JobContainer />
    </>
  );
};

export { AdminJob };
