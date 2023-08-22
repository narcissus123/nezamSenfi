import React, { FC, useEffect } from "react";

import {
  useGetAllMainLocations,
  usePostGetTreasurerCartableOfPositionRequestInMainLocationGuildRoomByFilter,
} from "../../../../../../../core/services/api";
import { TreasurerList } from "../TreasurerList/TreasurerList";
import { columns } from "./MainLocationTreasurerJobRequestListCartableColumn";



const MainLocationTreasurerJobRequestListCartable: FC = () => {
  const getAllMainLocationPositionCardBoard = usePostGetTreasurerCartableOfPositionRequestInMainLocationGuildRoomByFilter();
  const getOwnedMainLocationGuildRoom = useGetAllMainLocations();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      certificateExaminationStatus: 0,
      employmentLicenseStatus: 0,
      endCreateDate: "",
      historyOfServiceAfterGraduation: 0,
      mainLocationId: 0,
      maiLocationId: 0,
      ratingStatus: 0,
      ratingTitle: "",
      startCreateDate: "",
      status: 0,
      tradeUnionLicenseStatus: 0,
      userId: 0,
    };

    try {
      if (
        getOwnedMainLocationGuildRoom.data &&
        getOwnedMainLocationGuildRoom.data.data
      ) {
        const mainLocationId = getOwnedMainLocationGuildRoom.data.data.result[0].id;

        getAllMainLocationPositionCardBoard.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          mainLocationId: mainLocationId ? mainLocationId : 0,
          maiLocationId: mainLocationId ? mainLocationId : 0,
        });
      }
    } catch (error) {}
  }, [getOwnedMainLocationGuildRoom.isSuccess]);

  return (
    <TreasurerList
      useMutate={getAllMainLocationPositionCardBoard}
      columns={columns}
      getOwnedMainLocationGuildRoom={getOwnedMainLocationGuildRoom}
    />
  );
};

export { MainLocationTreasurerJobRequestListCartable };
