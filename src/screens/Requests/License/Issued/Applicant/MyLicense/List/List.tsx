import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { List as ListContainer } from "../../../../../../../components/Requests/License/Issued/Applicant/MyLicense/ListContainer/List";

const List = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="پروانه های من"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست پروانه ها"
      />
      <ListContainer />
    </>
  );
};

export { List };
