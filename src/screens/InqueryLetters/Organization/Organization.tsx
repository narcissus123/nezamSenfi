import * as React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { OrganizationContainer } from "../../../components/InqueryLetters/OrganizationContainer/OrganizationContainer";

export interface PersonalInfoProps {}

const Organization: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="سازمان ها"
      />
      <OrganizationContainer />
    </>
  );
};

export { Organization };
