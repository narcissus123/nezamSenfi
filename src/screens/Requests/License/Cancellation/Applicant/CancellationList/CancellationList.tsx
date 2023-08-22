import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { List } from "../../../../../../components/Requests/License/Cancellation/Applicant/CancellationListContainer/List";

const CancelltionList = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="ابطال"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست های ابطال"
      />
      <List />
    </>
  );
};

export { CancelltionList };
