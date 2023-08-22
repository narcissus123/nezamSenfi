import React, { FC, useEffect } from "react";

import {
  useGetOwnedUserCountyGuildRoomsForTreasurer,
  usePostGetTreasurerCartableOfPositionRequestInCountyGuildRoomByFilter,
} from "../../../../../../../core/services/api";
import { TreasurerList } from "../TreasurerList/TreasurerList";
import { columns } from "./CountyTreasurerJobRequestListCartableColumn";



const CountyTreasurerJobRequestListCartable: FC = () => {
  const getTreasurerCountyPositionCartable = usePostGetTreasurerCartableOfPositionRequestInCountyGuildRoomByFilter();

  const getOwnedCountyGuildRoom = useGetOwnedUserCountyGuildRoomsForTreasurer();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      certificateExaminationStatus: 0,
      employmentLicenseStatus: 0,
      endCreateDate: "",
      historyOfServiceAfterGraduation: 0,
      countyId: 0,
      ratingStatus: 0,
      ratingTitle: "",
      startCreateDate: "",
      status: 0,
      tradeUnionLicenseStatus: 0,
      userId: 0,
    };

    try {
      if (getOwnedCountyGuildRoom.data && getOwnedCountyGuildRoom.data.data) {
        const countyId = getOwnedCountyGuildRoom.data.data.result[0].id;
        getTreasurerCountyPositionCartable.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          countyId: countyId ? countyId : 0,
        });
      }
    } catch (error) {}
  }, [getOwnedCountyGuildRoom.isSuccess]);

  return (
    <TreasurerList
      useMutate={getTreasurerCountyPositionCartable}
      columns={columns}
      useOwnCountyGuildRooms={getOwnedCountyGuildRoom}
    />
  );
};

export { CountyTreasurerJobRequestListCartable };
