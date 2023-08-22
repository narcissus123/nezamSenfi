import * as React from "react";

import { JobCategoryContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminJobField/JobCategoryContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminJobCategory: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="زمینه فعالیت و مشاغل"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="گروه"
      />
      <JobCategoryContainer />
    </>
  );
};

export { AdminJobCategory };
