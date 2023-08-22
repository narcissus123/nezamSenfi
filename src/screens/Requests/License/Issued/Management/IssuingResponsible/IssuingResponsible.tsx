import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { MyCartableContainer } from "../../../../../../components/Requests/License/Issued/Management/IssuingResponsibleContainer/MyCartableContainer";

const IssuingResponsible: React.FC = () => {
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

export { IssuingResponsible };
