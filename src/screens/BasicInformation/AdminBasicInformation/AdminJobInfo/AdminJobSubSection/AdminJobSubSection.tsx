import * as React from "react";

import { JobSubSectionContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminJobField/JobSubSectionContainer/JobSubSectionContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminJobSubSection: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="زمینه فعالیت و مشاغل"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="قسمت"
      />
      <JobSubSectionContainer />
    </>
  );
};

export { AdminJobSubSection };
