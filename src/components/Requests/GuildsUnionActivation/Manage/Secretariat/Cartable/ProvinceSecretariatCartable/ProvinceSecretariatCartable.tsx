import React, { FC, useEffect } from "react";
import {
  useGetAllprovinces,
  useGetSecretariatCartableOfProvinceGuildRoomRequests,
} from "../../../../../../../core/services/api";
import { SecretariatList } from "../../GuildActivationList/SecretariatList/SecretariatList";
import { columns } from "./Column";

const ProvinceSecretariatCartable: FC = () => {
  const getProvinceCartable = useGetSecretariatCartableOfProvinceGuildRoomRequests();
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

    getProvinceCartable.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      provinceId: 0,
    });
  }, []);

  return (
    <SecretariatList
      useMutate={getProvinceCartable}
      columns={columns}
      getAllProvince={getAllProvince}
      getCustomProps={{ flow: "ProvinceSecretariatFlow" }}
      isAllGuildRoom
    />
  );
};

export { ProvinceSecretariatCartable };
