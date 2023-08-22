import React, { FC, useEffect } from "react";
import {
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useGetItManagerCartableOfUnionRequests,
} from "../../../../../../core/services/api";
import { SecretariatList } from "../../Secretariat/GuildActivationList/SecretariatList/SecretariatList";
import { columns } from "./Column";

const UnionItManagerCartable: FC = () => {
  const getItManagerUnionCartable = useGetItManagerCartableOfUnionRequests();
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

    // if (getProvince.data && getProvince.data.data) {
    // const provinceId = getProvince.data.data.result[0].id;
    getItManagerUnionCartable.mutate({
      ...filterState,
      page: 1,
      pageSize: 8,
      //provinceId: provinceId ? provinceId : 0,
    });
    //}
  }, []);

  return (
    <SecretariatList
      useMutate={getItManagerUnionCartable}
      columns={columns}
      getAllCounty={getAllCountyGuildRoom}
      getAllProvince={getProvince}
      getCustomProps={{ flow: "UnionItManagerFlow" }}
      isAllGuildRoom
    />
  );
};

export { UnionItManagerCartable };
