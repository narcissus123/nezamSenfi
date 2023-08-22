import React from "react";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UsersListContainer } from "../../../components/UsersList/UsersListContainer/UsersListContainer";

const RealUsersList: React.FC = () => {
  return (
    <>
     <BreadCrumbs
        breadCrumbTitle="لیست کاربران حقیقی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="لیست کاربران حقیقی"
      />
      <UsersListContainer />
    </>
  );
};

export { RealUsersList };
