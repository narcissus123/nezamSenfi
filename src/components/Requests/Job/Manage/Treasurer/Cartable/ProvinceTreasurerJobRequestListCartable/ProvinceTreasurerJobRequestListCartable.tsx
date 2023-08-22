import React, { FC, useEffect} from "react";

import {
  useGetOwnedUserProvinceGuildRoomsForTreasurer,
  usePostGetTreasurerCartableOfPositionRequestInProvinceGuildRoomByFilter,
} from "../../../../../../../core/services/api";
import { TreasurerList } from "../TreasurerList/TreasurerList";
import { columns } from "./ProvinceTreasurerJobRequestListCartableColumn";



const ProvinceTreasurerJobRequestListCartable: FC = () => {
  const getAllProvincePositionCardBoard = usePostGetTreasurerCartableOfPositionRequestInProvinceGuildRoomByFilter();

  const getOwnedProvinceGuildRoom = useGetOwnedUserProvinceGuildRoomsForTreasurer();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      certificateExaminationStatus: 0,
      employmentLicenseStatus: 0,
      endCreateDate: "",
      historyOfServiceAfterGraduation: 0,
      provinceId: 0,
      ratingStatus: 0,
      ratingTitle: "",
      startCreateDate: "",
      status: 0,
      tradeUnionLicenseStatus: 0,
      userId: 0,
    };

    try {
      if (
        getOwnedProvinceGuildRoom.data &&
        getOwnedProvinceGuildRoom.data.data
      ) {
        const provinceId = getOwnedProvinceGuildRoom.data.data.result[0].id;

        getAllProvincePositionCardBoard.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          provinceId: provinceId ? provinceId : 0,
        });
      }
    } catch (error) {}
  }, [getOwnedProvinceGuildRoom.isSuccess]);

  return (
    <TreasurerList
      useMutate={getAllProvincePositionCardBoard}
      columns={columns}
      useOwnedProvinceGuildRooms={getOwnedProvinceGuildRoom}
    />
  );
};

export { ProvinceTreasurerJobRequestListCartable };
