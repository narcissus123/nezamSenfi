import React, { FC, useEffect } from "react";
import {
  useGetAllPositionRequestInCountyGuildRoomByFilterForViceManager,
  useGetOwnedUserCountyGuildRoomsForViceManager,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../../Secretariat/JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./Column";

const County: FC = () => {
  const getAllCountyPosition = useGetAllPositionRequestInCountyGuildRoomByFilterForViceManager();

  const getOwnedCountyGuildRoom = useGetOwnedUserCountyGuildRoomsForViceManager();

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

        getAllCountyPosition.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          countyId: countyId ? countyId : 1,
        });
      }
    } catch (error) {}
  }, [getOwnedCountyGuildRoom.isSuccess]);

  return (
    <SecretariatList
      useMutate={getAllCountyPosition}
      columns={columns}
      useOwnCountyGuildRooms={getOwnedCountyGuildRoom}
      getCustomProps={{ flow: "CountyViceManagerJobRequestFlow" }}
    />
  );
};

export { County };
