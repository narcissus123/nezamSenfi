import React, { FC } from "react";
import { useGetOwnedUserCountyGuildRoomsForAdmin } from "../../../../../../core/services/api";
import { RegisteryDocs } from "../../../Shared/RegisteryDocs/RegisteryDocs";

const AddGuild: FC = () => {
  const getCounty = useGetOwnedUserCountyGuildRoomsForAdmin();

  return (
    <RegisteryDocs
      refetch={() => {}}
      isAdd
      getCounty={getCounty}
      type="Union"
    />
  );
};

export { AddGuild };
