import React, { FC, useEffect } from "react";

import {
  usePostGetAllPositionRequestInUnionGuildRoomByFilter,
  useGetOwnedUserUnion,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../../Secretariat/JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./UnionSecretariatJobRequestListColumn";

interface IPropTypes {
  getManagerCartable?: any;
}

const UnionManagerJobRequestList: FC<IPropTypes> = ({ getManagerCartable }) => {
  const getAllUnionPosition = usePostGetAllPositionRequestInUnionGuildRoomByFilter();

  const getOwnedUnionGuildRoom = useGetOwnedUserUnion();

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

        if (getManagerCartable)
          getManagerCartable.mutate({
            ...filterState,
            page: 1,
            pageSize: 8,
            countyUnionId: countyUnionId ? countyUnionId : 1,
          });
        else
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
      useMutate={getManagerCartable ? getManagerCartable : getAllUnionPosition}
      columns={columns}
      useOwUnionGuildRooms={getOwnedUnionGuildRoom}
      getCustomProps={{ flow: "UnionManagerJobRequestFlow" }}
    />
  );
};

export { UnionManagerJobRequestList };
