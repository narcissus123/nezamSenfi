import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MyCartable } from "../../../../../../components/Requests/License/Issued/Management/JahadContainer/MyCartable";

const Jahad: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="مدیر جهاد"
        breadCrumbActive="کارتابل من"
      />
      <MyCartable />
    </>
  );
};

export { Jahad };
