import React, { FC, useEffect } from "react";

import {
  useGetOwnedUserUnionForSecretariat,
  usePostGetSecretariatCartableOfPositionRequestInCountyUnionByFilter,
} from "../../../../../../../../core/services/api";
import { SecretariatList } from "../../../JobRequestslist/SecretariatList/SecretariatList";
import { columns } from "./UnionSecretariatJobRequestListCartableColumn";



const UnionSecretariatJobRequestListCartable: FC = () => {
  const getSecretariatUnionPositionCartable = usePostGetSecretariatCartableOfPositionRequestInCountyUnionByFilter();

  const getOwnedUserUnion = useGetOwnedUserUnionForSecretariat();

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

    // if (getOwnedUserUnion.data && getOwnedUserUnion.data.data) {
    //const countyId = getOwnedUserUnion.data.data.result[0].id;
    getSecretariatUnionPositionCartable.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      countyUnionId: 0, //countyId ? countyId : 0,
    });
    // }
  }, []);

  return (
    <SecretariatList
      isAllGuildRoom
      useMutate={getSecretariatUnionPositionCartable}
      columns={columns}
      useOwUnionGuildRooms={getOwnedUserUnion}
      getCustomProps={{ flow: "UnionSecretariatJobRequestFlow" }}
    />
  );
};

export { UnionSecretariatJobRequestListCartable };
