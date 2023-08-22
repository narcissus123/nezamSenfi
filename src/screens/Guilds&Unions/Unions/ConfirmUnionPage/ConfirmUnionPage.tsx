import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";

import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { UnionConfirmList } from "../../../../components/Guilds&UnionsContainer/UnionsContainer/UnionConfirmList/UnionConfirmList";

const ConfirmUnionPage: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="اتحادیه ها"
        breadCrumbParent="داشبورد"
        breadCrumbActive="لیست اتحادیه ها"
      />

      <Card>
        <CardBody>
          <UnionConfirmList />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { ConfirmUnionPage };
