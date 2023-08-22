import React, { FC, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { GuildUsersList } from "../../../../components/Guilds&UnionsContainer/GuildsContainer/County/GuildUsersList/GuildUsersList";
import { useLocation } from "react-router-dom";
import { UserRoles } from "../../../../core/enums";
import { Can } from "../../../../components/common/Wrapper/Can/Can";

const EditCountyPage: FC = () => {

  const location :any = useLocation();
  
  return (
    <Fragment>
      <Can roles={[UserRoles.ProvinceGuildRoomManager]}>
        <BreadCrumbs
          breadCrumbTitle="کاربران صنف شهرستانی"
          breadCrumbParent="لیست اصناف شهرستانی"
          parentLink="/Guilds/county"
          breadCrumbActive={`شهرستان ${
            location.state ? location.state.countyName : ""
          } ${location.state ? `(صنف ${location.state.title})` : ""}`}
        />
      </Can>

      <Card>
        <CardBody>
          <GuildUsersList />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { EditCountyPage };
