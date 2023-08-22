import React, { useEffect } from "react";
import {
  useGetCountyUnionByCountyId,
  useGetOwnedUserCountyGuildRooms,
  usePostGetUpManagerCartableOfPositionRequestInCountyUnionByFilter,
} from "../../../../../../../core/services/api";
import { ManagerList } from "../ManagerList/ManagerList";
import { columns } from "./UnionManagerJobRequestListCartableColumn";

const UnionManagerJobRequestListCartable = () => {
  const getUpManagerUnionPositionCartable = usePostGetUpManagerCartableOfPositionRequestInCountyUnionByFilter();

  const getOwnedUserCounty = useGetOwnedUserCountyGuildRooms();
  const getLocationListMutation = useGetCountyUnionByCountyId();

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
      if (getOwnedUserCounty.data && getOwnedUserCounty.data.data) {
        const countyResult = getOwnedUserCounty.data.data.result;

        getLocationListMutation.mutate(
          {
            page: 1,
            pageSize: 500,
            countyId: countyResult[0].id,
          },
          {
            onSuccess: (val: any) => {
              try {
                const result = val.data.result;

                getUpManagerUnionPositionCartable.mutate({
                  ...filterState,
                  page: 1,
                  pageSize: 8,
                  //countyUnionId: result.unions[0] ? result.unions[0].id : 0,
                  countyId: countyResult[0] ? countyResult[0].id : 0,
                });
              } catch (e) {}
            },
          }
        );
      }
    } catch (e) {}
  }, [getOwnedUserCounty.data, getOwnedUserCounty.isSuccess]);

  return (
    <ManagerList
      isAllGuildRoom
      useMutate={getUpManagerUnionPositionCartable}
      columns={columns}
      useOwnCountyGuildRooms={getOwnedUserCounty}
      getLocationListMutation={getLocationListMutation}
    />
  );
};

export { UnionManagerJobRequestListCartable };
