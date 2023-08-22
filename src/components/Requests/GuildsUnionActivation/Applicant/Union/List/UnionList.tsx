import React, { FC } from "react";
import {
  useGetMyUnionRequestsByCountyId,
  useGetOwnedUserCountyGuildRoomsForAdmin,
} from "../../../../../../core/services/api";
import { GuildsRequestList } from "../../GuildsRequestList/GuildsRequestList";
import { columns } from "./Columns";

const UnionList: FC = () => {
  const getList = useGetMyUnionRequestsByCountyId();

  return (
    <GuildsRequestList
      columns={columns}
      getCountyList={getList}
      flow="UnionApplicantFlow"
      isUnion
      useOwnedCountyAdmin={useGetOwnedUserCountyGuildRoomsForAdmin}
    />
  );
};

export { UnionList };
