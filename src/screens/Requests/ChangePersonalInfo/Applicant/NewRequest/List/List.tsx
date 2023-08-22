import * as React from "react";
import BreadCrumbs from "../../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { ListContainer } from "../../../../../../components/Requests/ChangePersonalInfoContainer/Applicant/NewRequest/ListContainer/ListContainer";

const List = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تغیر اطلاعات هویتی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست درخواست های تغییر"
      />
      <ListContainer />
    </>
  );
};

export { List };
