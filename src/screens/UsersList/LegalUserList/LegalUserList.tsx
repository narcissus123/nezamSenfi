import * as React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { LegalUserListContainer } from "../../../components/UsersList/LegalUserListContainer";

const LegalUserList: React.FC = () => {
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="لیست کاربران حقوقی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست کاربران حقوقی"
      />
      <LegalUserListContainer />
    </>
  );
};

export { LegalUserList };
