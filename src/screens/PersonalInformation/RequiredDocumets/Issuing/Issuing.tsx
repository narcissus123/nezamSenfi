import * as React from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { IssuingDocuemtsContainer } from "../../../../components/PersonalInformation/RequiredDocuments/IssuingDocumentsContainer/IssuingDocuemtsContainer";

export interface PersonalInfoProps {}

const Issuing: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اسناد مورد نیاز"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اسناد صدور مورد نیاز"
      />
      <IssuingDocuemtsContainer />
    </>
  );
};

export { Issuing };
