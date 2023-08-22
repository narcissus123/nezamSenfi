import React, { FC } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  useGetAllMainLocationGuildRoomPosition,
  useGetAllMainLocations,
  useSetPositionInMainLocationGuildRoom,
} from "../../../../core/services/api";
import { PositionSetting } from "../PositionSetting/PositionSetting";

const MainLocationPositionSetting: FC = () => {
  const getOwnedMainLocationGuildRoom = useGetAllMainLocations();

  const getMainLocationGuildRoomPosition =
    useGetAllMainLocationGuildRoomPosition();
  const useMutate = useSetPositionInMainLocationGuildRoom();

  return (
    <Card>
      <CardHeader>
        <CardTitle>اختصاص شغل</CardTitle>
      </CardHeader>
      <CardBody>
        <PositionSetting
          getMainLocation={getOwnedMainLocationGuildRoom}
          getCurPosition={getMainLocationGuildRoomPosition}
          useMutate={useMutate}
        />
      </CardBody>
    </Card>
  );
};

export { MainLocationPositionSetting };
