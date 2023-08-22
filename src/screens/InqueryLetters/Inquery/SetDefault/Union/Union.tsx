import * as React from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Union as UnionContainer } from "../../../../../components/InqueryLetters/InqueryLetterSetDefaultContainer/Union/Union";

export interface IProps {}

const Union: React.FC<IProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ثبت نامه پیشفرض اتحادیه"
      />
      <UnionContainer />
    </>
  );
};

export { Union };
