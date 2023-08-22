import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AdminCountyList as AdminCountyListContainer } from "../../../../components/Guilds&UnionsContainer/GuildsContainer/County/AdminCountyList/AdminCountyList";

const AdminCountyList: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="اصناف"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اصناف شهرستانی"
      />
      <Card>
        <CardBody>
          <AdminCountyListContainer />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { AdminCountyList };
