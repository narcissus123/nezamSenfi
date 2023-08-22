import React, { FC, useEffect } from "react";
import { useGetAllprovinces } from "../../../../../../../core/services/api";
import { useGetAllProvinceGuildRoomRequestsByManagerAndSecretariat } from "../../../../../../../core/services/api/guild-request.api";
import { SecretariatList } from "../SecretariatList/SecretariatList";
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
      // const provinceId = getAllProvince.data.data.result[0].id;

      getAllProvinceGuild.mutate({
        ...filterState,
        page: 1,
        pageSize: 8,
        provinceId: 0,
      });
    } catch (error) {}
  }, []);

  return (
    <SecretariatList
      useMutate={getAllProvinceGuild}
      getCustomProps={{ flow: "ProvinceSecretariatFlow" }}
      columns={columns}
      getAllProvince={getAllProvince}
      isAllGuildRoom
    />
  );
};

export { Province };
