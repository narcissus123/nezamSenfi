import React, { useEffect } from "react";
import {
  useGetAllProvinceGuildRoomsForDropDown,
  usePostGetUpManagerCartableOfPositionRequestInProvinceGuildRoomByFilter,
} from "../../../../../../../core/services/api";
import { ManagerList } from "../ManagerList/ManagerList";
import { columns } from "./ProvinceManagerJobRequestListCartableColumn";

const ProvinceManagerJobRequestListCartable = () => {
  const getAllProvincePositionCardBoard =
    usePostGetUpManagerCartableOfPositionRequestInProvinceGuildRoomByFilter();

  const getOwnedProvinceGuildRoom = useGetAllProvinceGuildRoomsForDropDown();

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
      mainLocationId: 1,
    };

    try {
      if (
        getOwnedProvinceGuildRoom.data &&
        getOwnedProvinceGuildRoom.data.data
      ) {
        const provinceResult = getOwnedProvinceGuildRoom.data.data.result;

        try {
          getAllProvincePositionCardBoard.mutate({
            ...filterState,
            page: 1,
            pageSize: 8,
            provinceId: 0,
          });
        } catch (e) {}
      }
    } catch (e) {}
  }, [getOwnedProvinceGuildRoom.data, getOwnedProvinceGuildRoom.isSuccess]);

  return (
    <ManagerList
      isAllGuildRoom
      useMutate={getAllProvincePositionCardBoard}
      columns={columns}
      getOwnedMainLocationGuildRoom={getOwnedProvinceGuildRoom}
    />
  );
};

export { ProvinceManagerJobRequestListCartable };
