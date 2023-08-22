import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { Can } from "../../../../../components/common/Wrapper/Can/Can";
import { AddGuildUser } from "../../../../../components/Guilds&UnionsContainer/GuildsContainer/Provincial/GuildUsersList/AddGuildUser/AddGuildUser";
import { GuildUsersList } from "../../../../../components/Guilds&UnionsContainer/GuildsContainer/Provincial/GuildUsersList/GuildUsersList";
import { UserRoles } from "../../../../../core/enums";



const EditProvincePage: FC = () => {

  const location :any = useLocation();
  
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="کاربران صنف استانی"
        breadCrumbParent="لیست اصناف استانی"
        parentLink="/Guilds/province"
        breadCrumbActive={`استان ${
          location.state ? location.state.provinceName : "" 
        } ${location.state ? `(صنف ${location.state.title})` : ""}`}
      />

      <Can roles={[UserRoles.ProvinceGuildRoomAdmin]}>
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

export { EditProvincePage };
