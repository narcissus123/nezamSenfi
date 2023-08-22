import * as React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { PersonalInfoContainer } from "../../../components/PersonalInformation/PersonalInfoContainer/PersonalInfoContainer";

export interface PersonalInfoProps {}

const PersonalInfo: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات فردی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اطلاعات فردی"
      />
      <PersonalInfoContainer />
    </>
  );
};

export { PersonalInfo };
