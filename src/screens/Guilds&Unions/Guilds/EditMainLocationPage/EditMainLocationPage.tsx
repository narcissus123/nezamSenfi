import React, { FC, Fragment, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";

import { useLocation } from "react-router-dom";
import { GuildUsersList } from "../../../../components/Guilds&UnionsContainer/GuildsContainer/MainLocation/GuildUsersList/GuildUsersList";
import BreadCrumbs from "../../../../components/common/@vuexy/breadCrumbs/BreadCrumb";
import { AddGuildUser } from "../../../../components/Guilds&UnionsContainer/GuildsContainer/MainLocation/GuildUsersList/AddGuildUser/AddGuildUser";
import { useGetAllMainLocations } from "../../../../core/services/api";
import { FallBackSpinner } from "../../../../components/common/Spinner/FallBackSpinner/FallbackSpinner";
import { Can } from "../../../../components/common/Wrapper/Can/Can";
import { UserRoles } from "../../../../core/enums";

const EditMainLocationPage: FC = () => {

  const location :any = useLocation();
  const [mainLocationId, setMainLocationId] = useState<any>(1)
  const { data, isSuccess, isFetching } = useGetAllMainLocations();

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newMainLocations: any = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newMainLocations[0].options = newOptions;
      setMainLocationId(newMainLocations[0].options[0].value);
    }
  }, [isSuccess, data]);
  
  return (
    <Fragment>
      {isFetching ? (
        <FallBackSpinner />
      ) : (
        <>
          <BreadCrumbs
            breadCrumbTitle="کاربران کشوری "
            breadCrumbParent="لیست کاربران کشوری"
          />
          <Can roles={[UserRoles.Admin]}>
            <Card>
              <CardBody>
                <AddGuildUser mainLocationId={mainLocationId} />
              </CardBody>
            </Card>
          </Can>
          <Card>
            <CardBody>
              <GuildUsersList mainLocationId={mainLocationId} />
            </CardBody>
          </Card>
        </>
      )}
    </Fragment>
  );
};

export { EditMainLocationPage };
