import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Can } from "../../../../../components/common/Wrapper/Can/Can";
import { AddGuildUser } from "../../../../../components/Guilds&UnionsContainer/GuildsContainer/County/GuildUsersList/AddGuildUser/AddGuildUser";
import { GuildUsersList } from "../../../../../components/Guilds&UnionsContainer/GuildsContainer/County/GuildUsersList/GuildUsersList";

import { UserRoles } from "../../../../../core/enums";



const EditCountyPageAdmin: FC = () => {

  const location :any = useLocation();
  
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="کاربران صنف شهرستانی"
        breadCrumbParent="لیست اصناف شهرستانی"
        parentLink="/Guilds/county"
        breadCrumbActive={`صنف ${
          location.state ? location.state.countyName : ""
        }`}
      />

      <Can roles={[UserRoles.CountyGuildRoomAdmin]}>
        <Card>
          <CardBody>
            <AddGuildUser />
          </CardBody>
        </Card>
      </Can>
      <Card>
        <CardBody>
          <GuildUsersList isAdmin />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { EditCountyPageAdmin };
