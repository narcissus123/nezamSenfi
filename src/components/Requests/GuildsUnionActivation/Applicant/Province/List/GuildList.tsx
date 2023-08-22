import React, { FC } from "react";
import {
  useGetMyProvinceGuildRoomRequestsByProvinceId,
  useGetOwnedUserProvinceGuildRoomsForAdmin,
} from "../../../../../../core/services/api";
import { GuildsRequestList } from "../../GuildsRequestList/GuildsRequestList";
import { columns } from "./Columns";

const GuildList: FC = () => {
  const getList = useGetMyProvinceGuildRoomRequestsByProvinceId();

  return (
    <GuildsRequestList
      columns={columns}
      getProvinceList={getList}
      flow="ProvinceApplicantFlow"
      useOwnedProvinceAdmin={useGetOwnedUserProvinceGuildRoomsForAdmin}
    />
  );
};

export { GuildList };
