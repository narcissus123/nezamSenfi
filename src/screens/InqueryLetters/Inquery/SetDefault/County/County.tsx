import * as React from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { County as CountyContainer } from "../../../../../components/InqueryLetters/InqueryLetterSetDefaultContainer/County/County";

export interface IProps {}

const County: React.FC<IProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ثبت نامه پیشفرض شهرستانی"
      />
      <CountyContainer />
    </>
  );
};

export { County };
