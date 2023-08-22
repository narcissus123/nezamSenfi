import * as React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InqueryContainer } from "../../../components/InqueryLetters/InqueryContainer/InqueryContainer";

const Inquery: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="استعلامات"
      />
      <InqueryContainer />
    </>
  );
};

export { Inquery };
