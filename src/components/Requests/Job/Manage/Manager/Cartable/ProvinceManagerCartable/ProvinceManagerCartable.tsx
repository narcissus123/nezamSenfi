import React, { FC } from "react";
import { usePostGetAllPositionRequestInProvinceGuildRoomByFilterForManager } from "../../../../../../../core/services/api";
import { ProvinceManagerJobRequestList } from "../../ManagerList/ProvinceManagerJobRequestList/ProvinceManagerJobRequestList";

const ProvinceManagerCartable: FC = () => {
  const getManagerCartable = usePostGetAllPositionRequestInProvinceGuildRoomByFilterForManager();

  return (
    <ProvinceManagerJobRequestList getManagerCartable={getManagerCartable} />
  );
};

export { ProvinceManagerCartable };
