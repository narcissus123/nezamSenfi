import React, { FC, useEffect } from "react";

import {
  useGetAllPositionRequestInCountyUnionByFilterForViceManager,
  useGetOwnedUserUnionForViceManager,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../../Secretariat/JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./Column";

const Union: FC = () => {
  const getAllUnionPosition = useGetAllPositionRequestInCountyUnionByFilterForViceManager();

  const getOwnedUnionGuildRoom = useGetOwnedUserUnionForViceManager();

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
      if (getOwnedUnionGuildRoom.data && getOwnedUnionGuildRoom.data.data) {
        const countyUnionId =
          getOwnedUnionGuildRoom.data.data.result.unions[0].id;

        getAllUnionPosition.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          countyUnionId: countyUnionId ? countyUnionId : 1,
        });
      }
    } catch (e) {}
  }, [getOwnedUnionGuildRoom.isSuccess]);

  return (
    <SecretariatList
      useMutate={getAllUnionPosition}
      columns={columns}
      useOwUnionGuildRooms={getOwnedUnionGuildRoom}
      getCustomProps={{ flow: "UnionViceManagerJobRequestFlow" }}
    />
  );
};

export { Union };
