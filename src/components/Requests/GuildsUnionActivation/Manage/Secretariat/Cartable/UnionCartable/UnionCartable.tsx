import React, { FC, useEffect } from "react";
import {
  useGetAllCountyByProvinceId,
  useGetOwnedUserProvinceGuildRoomsForSecretariat,
  useGetSecretariatCartableOfUnionRequests,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../GuildActivationList/SecretariatList/SecretariatList";
import { columns } from "./Column";

const UnionCartable: FC = () => {
  const getSecretariatUnionCartable = useGetSecretariatCartableOfUnionRequests();
  const getOwnedProvince = useGetOwnedUserProvinceGuildRoomsForSecretariat();
  const getAllCounty = useGetAllCountyByProvinceId();

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
      getSecretariatUnionCartable.mutate({
        ...filterState,
        page: 1,
        pageSize: 8,
        provinceId: provinceId ? provinceId : 0,
      });
    }
  }, [getOwnedProvince.isSuccess]);

  return (
    <SecretariatList
      useMutate={getSecretariatUnionCartable}
      columns={columns}
      getAllCounty={getAllCounty}
      useOwnedProvinceGuildRooms={getOwnedProvince}
      getCustomProps={{ flow: "UnionSecretariatFlow" }}
      isUnion
    />
  );
};

export { UnionCartable };
