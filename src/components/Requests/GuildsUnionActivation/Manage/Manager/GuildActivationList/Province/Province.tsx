import React, { FC, useEffect } from "react";
import { useGetAllprovinces } from "../../../../../../../core/services/api";
import { useGetAllProvinceGuildRoomRequestsByManagerAndSecretariat } from "../../../../../../../core/services/api/guild-request.api";
import { ManagerList } from "../ManagerList/ManagerList";
import { columns } from "./ProvinceColumn";

const Province: FC = () => {
  const getAllProvinceGuild = useGetAllProvinceGuildRoomRequestsByManagerAndSecretariat();

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

    try {
      getAllProvinceGuild.mutate({
        ...filterState,
        page: 1,
        pageSize: 8,
        //provinceId: provinceId ? provinceId : 0,
      });
    } catch (error) {}
  }, []);

  return (
    <ManagerList
      useMutate={getAllProvinceGuild}
      getCustomProps={{ flow: "ProvinceManagerFlow" }}
      columns={columns}
      getAllProvince={getAllProvince}
      isAllGuildRoom={true}
    />
  );
};

export { Province };
