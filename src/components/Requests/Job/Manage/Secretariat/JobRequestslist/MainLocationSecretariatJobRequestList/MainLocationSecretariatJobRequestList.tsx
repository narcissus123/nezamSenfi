import React, { FC, useEffect } from "react";

import {
  usePostGetAllPositionRequestInMainLocationGuildRoomByFilter,
  useGetAllMainLocations,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../SecretariatList/SecretariatList";
import { columns } from "./MainLocationSecretariatJobRequestListColumn";



const MainLocationSecretariatJobRequestList: FC = () => {
  const getAllMainLocationPosition = usePostGetAllPositionRequestInMainLocationGuildRoomByFilter();

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

    try {
      if (
        getOwnedMainLocationGuildRoom.data &&
        getOwnedMainLocationGuildRoom.data.data
      ) {
        const mainLocationId =
          getOwnedMainLocationGuildRoom.data.data.result[0].id;

        getAllMainLocationPosition.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          mainLocationId: mainLocationId ? mainLocationId : 0,
        });
      }
    } catch (error) {}
  }, [getOwnedMainLocationGuildRoom.isSuccess]);

  return (
    <SecretariatList
      useMutate={getAllMainLocationPosition}
      columns={columns}
      getCustomProps={{ flow: "MainLocationSecretariatJobRequestFlow" }}
      getOwnedMainLocationGuildRoom={getOwnedMainLocationGuildRoom}
    />
  );
};

export { MainLocationSecretariatJobRequestList };
