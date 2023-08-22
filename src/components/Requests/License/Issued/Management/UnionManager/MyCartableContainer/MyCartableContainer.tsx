import React, { FC } from "react";
import {
  useGetOwnedUserUnion,
  useGetAllLicenseRequestByUnionManager,
} from "../../../../../../../core/services/api";
import { RequestList } from "../../Shared/RequestLists/RequestList";
import { columns } from "./Columns";

const MyCartableContainer: FC = () => {
  const getOwnedUserUnion: any = useGetOwnedUserUnion();
  return (
    <>
      <RequestList
        getMutation={useGetAllLicenseRequestByUnionManager}
        columns={columns}
        flow="UnionManagerLicenseIssuedFlow"
        getOwnedUnion={getOwnedUserUnion}
      />
    </>
  );
};

export { MyCartableContainer };
