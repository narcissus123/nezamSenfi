import React, { FC } from "react";
import { usePostGetAllPositionRequestInCountyGuildRoomByFilterForManager } from "../../../../../../../core/services/api";
import { CountyManagerJobRequestList } from "../../ManagerList/CountyManagerJobRequestList";

const CountyManagerCartable: FC = () => {
  const getManagerCartable = usePostGetAllPositionRequestInCountyGuildRoomByFilterForManager();

  return (
    <CountyManagerJobRequestList getManagerCartable={getManagerCartable} />
  );
};

export { CountyManagerCartable };
