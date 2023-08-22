import React, { FC } from "react";
import { usePostGetAllPositionRequestInCountyUnionByFilterForManager } from "../../../../../../../core/services/api";
import { UnionManagerJobRequestList } from "../../ManagerList/UnionManagerJobRequestList/UnionManagerJobRequestList";

const UnionManagerCartable: FC = () => {
  const getManagerCartable = usePostGetAllPositionRequestInCountyUnionByFilterForManager();

  return <UnionManagerJobRequestList getManagerCartable={getManagerCartable} />;
};

export { UnionManagerCartable };
