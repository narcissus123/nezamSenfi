import * as React from "react";
import { JobSectionsContainer } from "../../../../../components/BasicInformation/AdminBasicInformation/AdminJobField/JobSectionsContainer/JobSectionsContainer";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const AdminJobSection: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="زمینه فعالیت و مشاغل"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="بخش"
      />
      <JobSectionsContainer />
    </>
  );
};

export { AdminJobSection };
