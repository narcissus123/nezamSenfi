import React, { FC, useEffect } from "react";

import {
  useGetAllCountyByProvinceId,
  useGetOwnedUserProvinceGuildRoomsForSecretariat,
  useGetSecretariatCartableOfCountyGuildRoomRequests,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../GuildActivationList/SecretariatList";
import { columns } from "./Column";

const CountySecretariatCartable: FC = () => {
  const getSecretariatCountyCartable = useGetSecretariatCartableOfCountyGuildRoomRequests();
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
    <SecretariatList
      useMutate={getSecretariatCountyCartable}
      columns={columns}
      getAllCounty={getAllCountyGuildRoom}
      useOwnedProvinceGuildRooms={getOwnedProvince}
      getCustomProps={{ flow: "CountySecretariatFlow" }}
    />
  );
};

export { CountySecretariatCartable };
