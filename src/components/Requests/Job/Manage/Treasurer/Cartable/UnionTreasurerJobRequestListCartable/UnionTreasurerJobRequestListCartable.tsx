import React, { FC, useEffect } from "react";

import {
  useGetOwnedUserUnionForTreasurer,
  usePostGetTreasurerCartableOfPositionRequestInCountyUnionByFilter,
} from "../../../../../../../core/services/api";
import { TreasurerList } from "../TreasurerList/TreasurerList";
import { columns } from "./UnionTreasurerJobRequestListCartableColumn";



const UnionTreasurerJobRequestListCartable: FC = () => {
  const getSecretariatUnionPositionCartable = usePostGetTreasurerCartableOfPositionRequestInCountyUnionByFilter();

  const getOwnedUserUnion = useGetOwnedUserUnionForTreasurer();

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

    if (getOwnedUserUnion.data && getOwnedUserUnion.data.data) {
      try {
        const countyId = getOwnedUserUnion.data.data.result.unions[0].unionId;
        getSecretariatUnionPositionCartable.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          unionId: countyId,
        });
      } catch (error) {}
    }
  }, [getOwnedUserUnion.isSuccess]);

  return (
    <TreasurerList
      useMutate={getSecretariatUnionPositionCartable}
      columns={columns}
      useOwUnionGuildRooms={getOwnedUserUnion}
    />
  );
};

export { UnionTreasurerJobRequestListCartable };
