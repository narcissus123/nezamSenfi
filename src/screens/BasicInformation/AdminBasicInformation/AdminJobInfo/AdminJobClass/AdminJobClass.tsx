import * as React from "react";

import { JobClassContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminJobField/JobClassContainer/JobClassContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminJobClass: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="زمینه فعالیت و مشاغل"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="طبقه"
      />
      <JobClassContainer />
    </>
  );
};

export { AdminJobClass };
