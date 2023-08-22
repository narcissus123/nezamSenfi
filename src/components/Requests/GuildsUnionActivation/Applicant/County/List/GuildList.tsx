import React, { FC } from "react";
import {
  useGetMyCountyGuildRoomRequestsByCountyId,
  useGetOwnedUserCountyGuildRoomsForAdmin,
} from "../../../../../../core/services/api";
import { GuildsRequestList } from "../../GuildsRequestList/GuildsRequestList";
import { columns } from "./Columns";

const GuildList: FC = () => {
  const getList = useGetMyCountyGuildRoomRequestsByCountyId();

  return (
    <GuildsRequestList
      columns={columns}
      getCountyList={getList}
      useOwnedCountyAdmin={useGetOwnedUserCountyGuildRoomsForAdmin}
      flow="CountyApplicantFlow"
    />
  );
};

export { GuildList };
