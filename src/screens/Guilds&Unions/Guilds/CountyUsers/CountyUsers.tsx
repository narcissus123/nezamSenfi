import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { Members as CountyMembersContainer } from "../../../../components/Guilds&UnionsContainer/GuildsContainer/County/Members/Members";

const CountyUsers: FC = () => {

  
  return (
    <Fragment>
      <BreadCrumbs
          breadCrumbTitle="کاربران شهرستانی"
          breadCrumbParent="لیست کاربران شهرستانی"
        />
      <Card>
        <CardBody>
          <CountyMembersContainer />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { CountyUsers };
