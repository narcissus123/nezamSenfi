import React, { FC } from "react";
import { usePostGetAllPositionRequestInMainLocationGuildRoomByFilterForManager } from "../../../../../../../core/services/api";
import { MainLocationManagerJobRequestList } from "../../ManagerList/MainLocationManagerJobRequestList/MainLocationManagerJobRequestList";

const MainLocationManagerCartable: FC = () => {
  const getManagerCartable = usePostGetAllPositionRequestInMainLocationGuildRoomByFilterForManager();

  return (
    <MainLocationManagerJobRequestList
      getManagerCartable={getManagerCartable}
    />
  );
};

export { MainLocationManagerCartable };
