import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MyCartableContainer } from "../../../../../../components/Requests/License/Issued/Management/SecreteriatContainer/MyCartableContainer/MyCartableContainer";

const Secreteriat: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل من"
      />
      <MyCartableContainer />
    </>
  );
};

export { Secreteriat };
