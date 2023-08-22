import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { JahadCenterContainer } from "../../../components/JahadCenterContainer/JahadCenterContainer";


const Manage: FC = () => {

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="مرکز جهاد"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="مدیریت مراکز جهاد"
      />
      <JahadCenterContainer />
    </Fragment>
  );
};

export { Manage };
