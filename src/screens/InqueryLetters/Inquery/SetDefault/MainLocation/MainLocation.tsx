import * as React from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MainLocation as MainLocationContainer } from "../../../../../components/InqueryLetters/InqueryLetterSetDefaultContainer/MainLocation/MainLocation";

export interface IProps {}

const MainLocation: React.FC<IProps> = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ثبت نامه پیشفرض کشوری"
      />
      <MainLocationContainer />
    </>
  );
};

export { MainLocation };
