import * as React from "react";

import { JobSubClassContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminJobField/JobSubClassContainer/JobSubClassContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminJobSubClass: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="زمینه فعالیت و مشاغل"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="زیر طبقه"
      />
      <JobSubClassContainer />
    </>
  );
};

export { AdminJobSubClass };
