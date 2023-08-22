import * as React from "react";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CartableContainer } from "../../../../../components/Requests/ChangePersonalInfoContainer/UnionManagerContainer/CartableContainer/CartableContainer";

const List = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="تغیر اطلاعات هویتی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="کارتابل درخواست های تغییر اطلاعات هویتی"
      />
      <CartableContainer />
    </>
  );
};

export { List };
