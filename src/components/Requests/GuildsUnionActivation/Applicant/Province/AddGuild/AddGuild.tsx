import React, { FC } from "react";
import { useGetOwnedUserProvinceGuildRoomsForAdmin } from "../../../../../../core/services/api";
import { RegisteryDocs } from "../../../Shared/RegisteryDocs/RegisteryDocs";

const AddGuild: FC = () => {
  const getProvince = useGetOwnedUserProvinceGuildRoomsForAdmin();

  return (
    <RegisteryDocs
      refetch={() => {}}
      isAdd
      getProvince={getProvince}
      type="Province"
    />
  );
};

export { AddGuild };
