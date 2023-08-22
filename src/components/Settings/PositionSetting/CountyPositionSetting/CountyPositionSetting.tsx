import React, { FC } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  useGetAllContyGuildRoomPosition,
  useGetAllCountyGuildRoomsByProvinceIdForDropDown,
  useGetOwnedUserProvinceGuildRoomsForAdmin,
  useSetPositionInCountyGuildRoom,
} from "../../../../core/services/api";
import { PositionSetting } from "../PositionSetting/PositionSetting";

const CountyPositionSetting: FC = () => {
  const getAllCountyGuildRoom =
    useGetAllCountyGuildRoomsByProvinceIdForDropDown();
  const getOwnedProvinceGuildRoom = useGetOwnedUserProvinceGuildRoomsForAdmin();

  const getCountyGuildRoomPosition = useGetAllContyGuildRoomPosition();
  const useMutate = useSetPositionInCountyGuildRoom();

  return (
    <Card>
      <CardHeader>
        <CardTitle>اختصاص شغل</CardTitle>
      </CardHeader>
      <CardBody>
        <PositionSetting
          getProvince={getOwnedProvinceGuildRoom}
          getCounty={getAllCountyGuildRoom}
          getCurPosition={getCountyGuildRoomPosition}
          useMutate={useMutate}
        />
      </CardBody>
    </Card>
  );
};

export { CountyPositionSetting };
