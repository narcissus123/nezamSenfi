import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AllRequestContainer } from "../../../../../../../components/Requests/License/Issued/Management/SecreteriatContainer/AllRequestContainer/AllRequestContainer";

const AllRequests = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های صدور"
      />
      <AllRequestContainer />
    </>
  );
};

export { AllRequests };
