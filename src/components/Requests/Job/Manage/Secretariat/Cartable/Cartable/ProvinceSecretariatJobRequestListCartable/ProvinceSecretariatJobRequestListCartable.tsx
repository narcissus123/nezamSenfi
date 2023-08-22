import React, { FC, useEffect } from "react";

import {
  usePostGGetSecretariatCartableOfPositionRequestInProvinceGuildRoomByFilter,
  useGetOwnedUserProvinceGuildRoomsForSecretariat,
} from "../../../../../../../../core/services/api";
import { SecretariatList } from "../../../JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./ProvinceSecretariatJobRequestListCartableColumn";



const ProvinceSecretariatJobRequestListCartable: FC = () => {
  const getAllProvincePositionCardBoard = usePostGGetSecretariatCartableOfPositionRequestInProvinceGuildRoomByFilter();

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

    //if (getOwnedProvinceGuildRoom.data && getOwnedProvinceGuildRoom.data.data) {
    //const provinceId = getOwnedProvinceGuildRoom.data.data.result[0].id;

    getAllProvincePositionCardBoard.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      provinceId: 0, //provinceId ? provinceId : 0,
    });
    // }
  }, []);

  return (
    <SecretariatList
      isAllGuildRoom
      useMutate={getAllProvincePositionCardBoard}
      columns={columns}
      getCustomProps={{ flow: "ProvinceSecretariatJobRequestFlow" }}
      useOwnedProvinceGuildRooms={getOwnedProvinceGuildRoom}
    />
  );
};

export { ProvinceSecretariatJobRequestListCartable };
