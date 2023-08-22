import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";

import { Members as UnionMembersContainer } from "../../../../components/Guilds&UnionsContainer/UnionsContainer/Unions/Members/Members";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

const UnionsUser: FC = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="کاربران اتحادیه"
        breadCrumbParent="لیست کاربران اتحادیه"
      />

      <Card>
        <CardBody>
          <UnionMembersContainer />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { UnionsUser };
