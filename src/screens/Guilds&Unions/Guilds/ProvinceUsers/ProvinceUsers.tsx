import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";

import { Members as ProvinceMembersContainer } from "../../../../components/Guilds&UnionsContainer/GuildsContainer/Provincial/Members/Members";

const ProvinceUsers: FC = () => {

  
  return (
    <Fragment>
       <BreadCrumbs
          breadCrumbTitle="کاربران استانی"
          breadCrumbParent="لیست کاربران استانی"
        />
      <Card>
        <CardBody>
          <ProvinceMembersContainer />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { ProvinceUsers };
