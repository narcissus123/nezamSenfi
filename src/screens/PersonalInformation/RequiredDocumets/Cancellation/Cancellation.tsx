import * as React from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CancellationDocumentsContainer } from "../../../../components/PersonalInformation/RequiredDocuments/CancellationDocumentsContainer/CancellationDocumentsContainer";

export interface PersonalInfoProps {}

const Cancellation: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اسناد مورد نیاز"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اسناد ابطال مورد نیاز"
      />
      <CancellationDocumentsContainer />
    </>
  );
};

export { Cancellation };
