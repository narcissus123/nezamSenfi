import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AdminUnionList as AdminUnionListContainer } from "../../../../components/Guilds&UnionsContainer/UnionsContainer/Unions/AdminUnionList/AdminUnionList";

const AdminUnionList: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="اتحادیه"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="اتحادیه ها"
      />
      <Card>
        <CardBody>
          <AdminUnionListContainer />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { AdminUnionList };
