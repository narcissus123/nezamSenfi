import React, { useEffect } from "react";
import {
  useGetCountyGuildRoomsByProvinceId,


  useGetOwnedUserProvinceGuildRooms,

  usePostGetUpManagerCartableOfPositionRequestInCountyGuildRoomByFilter
} from "../../../../../../../core/services/api";
import { ManagerList } from "../ManagerList/ManagerList";
import { columns } from "./CountyManagerJobRequestListCartableColumn";



const CountyManagerJobRequestListCartable = () => {
  const getManagerCountyPositionCartable = usePostGetUpManagerCartableOfPositionRequestInCountyGuildRoomByFilter();

  const getOwnedProvinceGuildRoom = useGetOwnedUserProvinceGuildRooms()
  const getLocationListMutation = useGetCountyGuildRoomsByProvinceId()

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
     
      if (
        getOwnedProvinceGuildRoom.data &&
        getOwnedProvinceGuildRoom.data.data
      ) {
        const provinceResult = getOwnedProvinceGuildRoom.data.data.result;

        getLocationListMutation.mutate(
          provinceResult[0].id,

          {
            onSuccess: (val: any) => {
              try {
                const result = val.data.result.countyGuildRooms;

                  getManagerCountyPositionCartable.mutate({
                    ...filterState,
                    page: 1,
                    pageSize: 8,
                    //countyId: result[0] ? result[0].id : 0,
                    provinceId : provinceResult[0] ? provinceResult[0].id : 0
                  });

              } catch (e) {}
            },
          }
        );
      }
    } catch (error) {}
  }, [ getOwnedProvinceGuildRoom.data , getOwnedProvinceGuildRoom.isSuccess]);

  return (
    <ManagerList
      isAllGuildRoom
      useMutate={getManagerCountyPositionCartable}
      columns={columns}
      useOwnedProvinceGuildRooms={getOwnedProvinceGuildRoom}
      getLocationListMutation={getLocationListMutation}
    />
  );
};

export { CountyManagerJobRequestListCartable };

