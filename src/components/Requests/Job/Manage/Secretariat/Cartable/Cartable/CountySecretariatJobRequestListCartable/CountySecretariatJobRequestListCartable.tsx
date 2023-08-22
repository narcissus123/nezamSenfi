import React, { FC, useEffect } from "react";

import {
  useGetOwnedUserCountyGuildRoomsForSecretariat,
  usePostGetSecretariatCartableOfPositionRequestInCountyGuildRoomByFilter,
} from "../../../../../../../../core/services/api";
import { SecretariatList } from "../../../JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./CountySecretariatJobRequestListCartableColumn";



const CountySecretariatJobRequestListCartable: FC = () => {
  const getSecretariatCountyPositionCartable = usePostGetSecretariatCartableOfPositionRequestInCountyGuildRoomByFilter();

  const getOwnedCountyGuildRoom = useGetOwnedUserCountyGuildRoomsForSecretariat();

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

    // if (getOwnedCountyGuildRoom.data && getOwnedCountyGuildRoom.data.data) {
    //const countyId = getOwnedCountyGuildRoom.data.data.result[0].id;
    getSecretariatCountyPositionCartable.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      countyId: 0, //countyId ? countyId : 0,
    });
    // }
  }, []);

  return (
    <SecretariatList
      isAllGuildRoom
      useMutate={getSecretariatCountyPositionCartable}
      columns={columns}
      useOwnCountyGuildRooms={getOwnedCountyGuildRoom}
      getCustomProps={{ flow: "CountySecretariatJobRequestFlow" }}
    />
  );
};

export { CountySecretariatJobRequestListCartable };
