import React, { FC, useEffect } from "react";
import {
  useGetAllCountyByProvinceId,
  useGetOwnedUserProvinceGuildRoomsForSecretariat,
} from "../../../../../../../core/services/api";
import { useGetAllCountyGuildRoomRequestsByManagerAndSecretariat } from "../../../../../../../core/services/api/guild-request.api";
import { SecretariatList } from "../SecretariatList/SecretariatList";
import { columns } from "./CountyColumn";

const County: FC = () => {
  const getAllCountyGuild = useGetAllCountyGuildRoomRequestsByManagerAndSecretariat();
  const getOwnedProvince = useGetOwnedUserProvinceGuildRoomsForSecretariat();
  const getAllCountyGuildRoom = useGetAllCountyByProvinceId();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      name: "",
      nationalId: "",
      cityId: 0,
      status: 0,
      provinceId: 0,
    };

    try {
      if (getOwnedProvince.data && getOwnedProvince.data.data) {
        const provinceId = getOwnedProvince.data.data.result[0].id;

        getAllCountyGuild.mutate({
          ...filterState,
          page: 1,
          pageSize: 8,
          provinceId: provinceId ? provinceId : 0,
        });
      }
    } catch (error) {}
  }, [getOwnedProvince.isSuccess]);

  return (
    <SecretariatList
      useMutate={getAllCountyGuild}
      getCustomProps={{ flow: "CountySecretariatFlow" }}
      columns={columns}
      useOwnedProvinceGuildRooms={getOwnedProvince}
      getAllCounty={getAllCountyGuildRoom}
    />
  );
};

export { County };
