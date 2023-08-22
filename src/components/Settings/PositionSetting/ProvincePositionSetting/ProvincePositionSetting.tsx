import React, { FC } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  useGetAllProvinceGuildRoomsForDropDown,
  usePostGetAllProvinceGuildRoomPosition,
  useSetPositionInProvinceGuildRoom,
} from "../../../../core/services/api";
import { PositionSetting } from "../PositionSetting";



const ProvincePositionSetting: FC = () => {
  const getAllProvinceGuildRoom = useGetAllProvinceGuildRoomsForDropDown();

  const getProvinceGuildRoomPosition = usePostGetAllProvinceGuildRoomPosition();
  const useMutate = useSetPositionInProvinceGuildRoom()

  return (
    <Card>
      <CardHeader>
        <CardTitle>اختصاص شغل</CardTitle>
      </CardHeader>
      <CardBody>
        <PositionSetting
          getProvince={getAllProvinceGuildRoom}
          getCurPosition={getProvinceGuildRoomPosition}
          useMutate={useMutate}
        />
      </CardBody>
    </Card>
  );
};

export { ProvincePositionSetting };
