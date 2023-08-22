import React, { FC, useEffect } from "react";
import {
  useGetAllCountyByProvinceId,
  useGetAllUnionRequestsByManagerAndSecretariat,
  useGetOwnedUserProvinceGuildRoomsForSecretariat,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../SecretariatList/SecretariatList";
import { columns } from "./UnionColumn";

const Union: FC = () => {
  const getAllUnion = useGetAllUnionRequestsByManagerAndSecretariat();
  const getOwnedProvince = useGetOwnedUserProvinceGuildRoomsForSecretariat();
  const getAllUnionRoom = useGetAllCountyByProvinceId();

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

        getAllUnion.mutate({
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
      useMutate={getAllUnion}
      getCustomProps={{ flow: "UnionSecretariatFlow" }}
      columns={columns}
      useOwnedProvinceGuildRooms={getOwnedProvince}
      getAllCounty={getAllUnionRoom}
      isUnion
    />
  );
};

export { Union };
