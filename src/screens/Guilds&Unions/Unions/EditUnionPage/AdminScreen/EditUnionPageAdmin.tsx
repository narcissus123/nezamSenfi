import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Can } from "../../../../../components/common/Wrapper/Can/Can";
import { AddUnionUser } from "../../../../../components/Guilds&UnionsContainer/UnionsContainer/Unions/UnionUsersList/AddUnionUser/AddUnionUser";
import { UnionUsersList } from "../../../../../components/Guilds&UnionsContainer/UnionsContainer/Unions/UnionUsersList/UnionUsersList";

import { UserRoles } from "../../../../../core/enums";

const EditUnionPage: FC = () => {
  const location: any = useLocation();

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="کاربران اتحادیه "
        breadCrumbParent="لیست کاربران"
        parentLink="/Unions"
        breadCrumbActive={`اتحادیه ${
          location.state ? location.state.unionName : ""
        }`}
      />

      <Can roles={[UserRoles.UnionAdmin]}>
        <Card>
          <CardBody>
            <AddUnionUser />
          </CardBody>
        </Card>
      </Can>
      <Card>
        <CardBody>
          <UnionUsersList isAdmin />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { EditUnionPage };
