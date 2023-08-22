import React, { FC, useEffect } from "react";

import {
  useGetAllCountyByProvinceId,
  useGetManagerCartableOfCountyGuildRoomRequests,
  useGetOwnedUserProvinceGuildRooms,
} from "../../../../../../../core/services/api";
import { ManagerList } from "../../GuildActivationList/ManagerList/ManagerList";
import { columns } from "./Column";

const CountyManagerCartable: FC = () => {
  const getSecretariatCountyCartable = useGetManagerCartableOfCountyGuildRoomRequests();
  const getOwnedProvince = useGetOwnedUserProvinceGuildRooms();
  const getAllCountyGuildRoom = useGetAllCountyByProvinceId();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      name: "",
      nationalId: "",
      cityId: 0,
      status: 0,
      provinceId: 0,
      countyId: 0,
    };

    if (getOwnedProvince.data && getOwnedProvince.data.data) {
      const provinceId = getOwnedProvince.data.data.result[0].id;
      getSecretariatCountyCartable.mutate({
        ...filterState,
        page: 1,
        pageSize: 8,
        provinceId: provinceId ? provinceId : 0,
      });
    }
  }, [getOwnedProvince.isSuccess]);

  return (
    <ManagerList
      useMutate={getSecretariatCountyCartable}
      columns={columns}
      getAllCounty={getAllCountyGuildRoom}
      useOwnedProvinceGuildRooms={getOwnedProvince}
      getCustomProps={{ flow: "CountyManagerFlow" }}
    />
  );
};

export { CountyManagerCartable };
