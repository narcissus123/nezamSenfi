import React, { FC, useEffect } from "react";

import {
  usePostGetAllPositionRequestInCountyGuildRoomByFilter,
  useGetOwnedUserProvinceGuildRoomsForViceManager,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../../Secretariat/JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./Column";

const Province: FC = () => {
  const getAllProvincePosition = usePostGetAllPositionRequestInCountyGuildRoomByFilter();

  const getOwnedProvinceGuildRoom = useGetOwnedUserProvinceGuildRoomsForViceManager();

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

        getAllProvincePosition.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          provinceId: provinceId ? provinceId : 0,
        });
      }
    } catch (error) {}
  }, [getOwnedProvinceGuildRoom.isSuccess]);

  return (
    <SecretariatList
      useMutate={getAllProvincePosition}
      columns={columns}
      useOwnedProvinceGuildRooms={getOwnedProvinceGuildRoom}
      getCustomProps={{ flow: "ProvinceViceManagerJobRequestFlow" }}
    />
  );
};

export { Province };
