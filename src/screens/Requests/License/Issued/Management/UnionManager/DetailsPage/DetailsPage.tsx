import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { DetailsPageContainer } from "../../../../../../../components/Requests/License/Issued/Management/UnionManager/DetailsPageContainer";

const DetailsPage = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="جزئیات درخواست"
        breadCrumbParent="لیست درخواست ها"
        parentLink="/ManageLicense/MyCartable"
        breadCrumbActive="جزئیات درخواست"
      />

      <DetailsPageContainer />
    </>
  );
};

export { DetailsPage };
