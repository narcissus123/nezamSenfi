import React, { FC, useEffect } from "react";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useGetItManagerCartableCountyGuildRoomRequests,
} from "../../../../../../core/services/api";
import { SecretariatList } from "../../Secretariat/GuildActivationList/SecretariatList";
import { columns } from "./Column";

const CountyItManagerCartable: FC = () => {
  const getItManagerCountyCartable = useGetItManagerCartableCountyGuildRoomRequests();
  const getProvince = useGetAllprovinces();
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

    //if (getProvince.data && getProvince.data.data) {
    //const provinceId = getProvince.data.data.result[0].id;
    getItManagerCountyCartable.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      // provinceId: provinceId ? provinceId : 0,
    });
    //}
  }, []);

  return (
    <SecretariatList
      useMutate={getItManagerCountyCartable}
      columns={columns}
      getAllCounty={getAllCountyGuildRoom}
      getAllProvince={getProvince}
      getCustomProps={{ flow: "CountyItManagerFlow" }}
      isAllGuildRoom
    />
  );
};

export { CountyItManagerCartable };
