import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Can } from "../../../../components/common/Wrapper/Can/Can";
import { UnionUsersList } from "../../../../components/Guilds&UnionsContainer/UnionsContainer/Unions/UnionUsersList/UnionUsersList";
import { UserRoles } from "../../../../core/enums/user-role.enum";


const EditUnionPage: FC = () => {

  const location :any = useLocation();

  return (
    <Fragment>
      <Can roles={[UserRoles.CountyGuildRoomManager]}>
        <BreadCrumbs
          breadCrumbTitle="کاربران اتحادیه "
          breadCrumbParent="لیست اتحادیه ها"
          parentLink="/Unions/"
          breadCrumbActive={`اتحادیه ${
            location.state ? location.state.unionName : ""
          }`}
        />

      </Can>
      <Card>
        <CardBody>
          <UnionUsersList />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { EditUnionPage };
