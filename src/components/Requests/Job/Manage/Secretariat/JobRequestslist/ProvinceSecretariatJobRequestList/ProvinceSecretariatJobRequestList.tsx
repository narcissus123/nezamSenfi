import React, { FC, useEffect } from "react";
import {
  useGetOwnedUserProvinceGuildRoomsForSecretariat,
  usePostGetAllPositionRequestInCountyGuildRoomByFilter,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../SecretariatList/SecretariatList";
import { columns } from "./ProvinceSecretariatJobRequestListColumn";

const ProvinceSecretariatJobRequestList: FC = () => {
  const getAllProvincePosition = usePostGetAllPositionRequestInCountyGuildRoomByFilter();

  const getOwnedProvinceGuildRoom = useGetOwnedUserProvinceGuildRoomsForSecretariat();

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
      getCustomProps={{ flow: "ProvinceSecretariatJobRequestFlow" }}
      columns={columns}
      useOwnedProvinceGuildRooms={getOwnedProvinceGuildRoom}
    />
  );
};

export { ProvinceSecretariatJobRequestList };
