import * as React from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { RequestDetails as RequestDetailsContainer } from "../../../../../components/Requests/ChangePersonalInfoContainer/Applicant/RequestDetails/RequestDetails";

const RequestDetails = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تغییر اطلاعات هویتی"
        breadCrumbParent="لیست درخواست ها"
        parentLink="/ChangePersonalInfo/List"
        breadCrumbActive="جزئیات درخواست"
      />
      <RequestDetailsContainer />
    </>
  );
};

export { RequestDetails };
