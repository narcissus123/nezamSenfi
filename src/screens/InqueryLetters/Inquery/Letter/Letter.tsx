import * as React from "react";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { InqueryLetterContainer } from "../../../../components/InqueryLetters/InqueryLetterContainer/InqueryLetterContainer";

const Letter: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="نامه استعلامات"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="استعلامات"
      />
      <InqueryLetterContainer />
    </>
  );
};

export { Letter };
