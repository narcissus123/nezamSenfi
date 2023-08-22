import React, { FC, useEffect } from "react";
import {
  useGetAllprovinces,
  useGetItManagerCartableOfProvinceGuildRoomRequests,
} from "../../../../../../core/services/api";
import { SecretariatList } from "../../Secretariat/GuildActivationList/SecretariatList/SecretariatList";
import { columns } from "./Column";

const ProvinceItManagerCartable: FC = () => {
  const getItManagerProvinceCartable = useGetItManagerCartableOfProvinceGuildRoomRequests();
  const getProvince = useGetAllprovinces();

  // first get owned province guild room then call getAllProvincePosition
  useEffect(() => {
    const filterState = {
      name: "",
      nationalId: "",
      cityId: 0,
      status: 0,
      provinceId: 0,
    };

    getItManagerProvinceCartable.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      //provinceId: provinceId ? provinceId : 0,
    });
  }, []);

  return (
    <SecretariatList
      useMutate={getItManagerProvinceCartable}
      columns={columns}
      getAllProvince={getProvince}
      getCustomProps={{ flow: "ProvinceItManagerFlow" }}
      isAllGuildRoom
    />
  );
};

export { ProvinceItManagerCartable };
