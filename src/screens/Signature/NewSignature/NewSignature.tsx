import * as React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { NewSignatureContainer } from "../../../components/Signature/NewSignatureContainer/NewSignatureContainer";

const NewSignature = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="امضا"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="ثبت امضا"
      />
      <NewSignatureContainer />
    </>
  );
};

export { NewSignature };
