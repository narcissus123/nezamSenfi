import React, { FC, useEffect } from "react";

import {
  usePostGetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter,
  useGetAllMainLocations,
} from "../../../../../../../../core/services/api";
import { SecretariatList } from "../../../JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./MainLocationSecretariatJobRequestListCartableColumn";



const MainLocationSecretariatJobRequestListCartable: FC = () => {
  const getAllMainLocationPositionCardBoard = usePostGetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter();
  const getOwnedMainLocationGuildRoom = useGetAllMainLocations();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      certificateExaminationStatus: 0,
      employmentLicenseStatus: 0,
      endCreateDate: "",
      historyOfServiceAfterGraduation: 0,
      mainLocationId: 0,
      ratingStatus: 0,
      ratingTitle: "",
      startCreateDate: "",
      status: 0,
      tradeUnionLicenseStatus: 0,
      userId: 0,
    };

    //if (getOwnedProvinceGuildRoom.data && getOwnedProvinceGuildRoom.data.data) {
    //const provinceId = getOwnedProvinceGuildRoom.data.data.result[0].id;

    getAllMainLocationPositionCardBoard.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      mainLocationId: 0, //provinceId ? provinceId : 0,
    });
    // }
  }, []);

  return (
    <SecretariatList
      isAllGuildRoom
      useMutate={getAllMainLocationPositionCardBoard}
      columns={columns}
      getOwnedMainLocationGuildRoom={getOwnedMainLocationGuildRoom}
      getCustomProps={{ flow: "MainLocationSecretariatJobRequestFlow" }}
    />
  );
};

export { MainLocationSecretariatJobRequestListCartable };
