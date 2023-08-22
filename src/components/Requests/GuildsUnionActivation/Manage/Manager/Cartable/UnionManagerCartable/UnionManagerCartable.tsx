import React, { FC, useEffect } from "react";

import {
  useGetAllCountyByProvinceId,
  useGetOwnedUserProvinceGuildRooms,
  useGetManagerCartableOfUnionRequests,
} from "../../../../../../../core/services/api";
import { ManagerList } from "../../GuildActivationList/ManagerList/ManagerList";
import { columns } from "./Column";

const UnionManagerCartable: FC = () => {
  const getCartable = useGetManagerCartableOfUnionRequests();
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
      getCartable.mutate({
        ...filterState,
        page: 1,
        pageSize: 8,
        provinceId: provinceId ? provinceId : 0,
      });
    }
  }, [getOwnedProvince.isSuccess]);

  return (
    <ManagerList
      useMutate={getCartable}
      columns={columns}
      getAllCounty={getAllCountyGuildRoom}
      useOwnedProvinceGuildRooms={getOwnedProvince}
      getCustomProps={{ flow: "UnionManagerFlow" }}
    />
  );
};

export { UnionManagerCartable };
