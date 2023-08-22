import * as React from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Province as ProvinceContainer } from "../../../../../components/InqueryLetters/InqueryLetterSetDefaultContainer/Province/Province";

export interface PersonalInfoProps {}

const Province: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ثبت نامه پیشفرض استانی"
      />
      <ProvinceContainer />
    </>
  );
};

export { Province };
