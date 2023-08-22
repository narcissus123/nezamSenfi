import * as React from "react";
import BreadCrumbs from "../../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { List as ListContainer } from "../../../../../../../components/Requests/License/Issued/Applicant/NewLicense/List/List";

const List = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صدور پروانه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست درخواست های صدور"
      />
      <ListContainer />
    </>
  );
};

export { List };
