import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { CountyConfirmList } from "../../../../components/Guilds&UnionsContainer/GuildsContainer/County/CountyConfirmList/CountyConfirmList";

const ConfirmCountyPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="اتاق اصناف"
        breadCrumbParent="لیست اصناف"
        breadCrumbActive="تایید اصناف"
      />
      <Card>
        <CardBody>
          <CountyConfirmList />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { ConfirmCountyPage };
