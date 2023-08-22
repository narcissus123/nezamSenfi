import React, { FC, useEffect } from "react";
import {
  useGetAllprovinces,
  useGetAllProvinceGuildRoomRequestsByManagerAndSecretariat,
} from "../../../../../../../core/services/api";
import { ManagerList } from "../../../Manager/GuildActivationList/ManagerList/ManagerList";
import { columns } from "./Column";

const Province: FC = () => {
  const getProvinceCartable = useGetAllProvinceGuildRoomRequestsByManagerAndSecretariat();
  const getAllProvince = useGetAllprovinces();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      name: "",
      nationalId: "",
      cityId: 0,
      status: 0,
      provinceId: 0,
    };

    // if (getAllProvince.data && getAllProvince.data.data) {
    // const provinceId = getAllProvince.data.data.result[0].id;
    getProvinceCartable.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      // provinceId: provinceId ? provinceId : 0,
    });
    // }
  }, []);

  return (
    <ManagerList
      useMutate={getProvinceCartable}
      columns={columns}
      getAllProvince={getAllProvince}
      getCustomProps={{ flow: "ProvinceViceManagerFlow" }}
      isAllGuildRoom
    />
  );
};

export { Province };
