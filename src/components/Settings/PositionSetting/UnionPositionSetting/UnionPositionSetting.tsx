import React, { FC } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  useGetAllUnionCountyPosition,
  useGetAllUnioinByCountyGuildroomIdForDropDown,
  useSetPositionInCountyUnion,
  useGetOwnedUserCountyGuildRoomsForAdmin,
} from "../../../../core/services/api";
import { PositionSetting } from "../PositionSetting/PositionSetting";



const UnionPositionSetting: FC = () => {
  const getAllUnionGuildRoom = useGetAllUnioinByCountyGuildroomIdForDropDown();
  const getOwnedCountyGuildRoom = useGetOwnedUserCountyGuildRoomsForAdmin();

  const getUnionGuildRoomPosition = useGetAllUnionCountyPosition();
  const useMutate = useSetPositionInCountyUnion();

  return (
    <Card>
      <CardHeader>
        <CardTitle>اختصاص شغل</CardTitle>
      </CardHeader>
      <CardBody>
        <PositionSetting
          getUnion={getAllUnionGuildRoom}
          getCounty={getOwnedCountyGuildRoom}
          getCurPosition={getUnionGuildRoomPosition}
          useMutate={useMutate}
        />
      </CardBody>
    </Card>
  );
};

export { UnionPositionSetting };
