import React, { useEffect } from "react";
import {
  useGetAllMainLocations,
  usePostGetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../../Secretariat/JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./MainLocationManagerJobRequestListCartableColumn";

const MainLocationManagerJobRequestListCartable = () => {
  const getAllMainLocationPositionCardBoard =
    usePostGetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter();
  const getOwnedMainLocationGuildRoom = useGetAllMainLocations();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      certificateExaminationStatus: 0,
      employmentLicenseStatus: 0,
      endCreateDate: "",
      historyOfServiceAfterGraduation: 0,
      mainLocationId: 1,
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

        getAllMainLocationPositionCardBoard.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          mainLocationId: mainLocationId ? mainLocationId : 0,
        });
      }
    } catch (error) {}
  }, []);

  return (
    <SecretariatList
      isAllGuildRoom
      useMutate={getAllMainLocationPositionCardBoard}
      columns={columns}
      getOwnedMainLocationGuildRoom={getOwnedMainLocationGuildRoom}
    />
  );
};

export { MainLocationManagerJobRequestListCartable };
