import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UsersContainer } from "../../../components/JahadCenterContainer/UsersContainer/UsersContainer";



const Users: FC = () => {

  const location :any = useLocation();
  
  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="مرکز جهاد"
        breadCrumbParent="لیست مراکز جهاد"
        parentLink="/JahadCenter"
        breadCrumbActive={`مرکز جهاد ${
          location.state ? location.state.jahadCenterTitle : ""
        }`}
      />
      <UsersContainer />
    </>
  );
};

export { Users };
