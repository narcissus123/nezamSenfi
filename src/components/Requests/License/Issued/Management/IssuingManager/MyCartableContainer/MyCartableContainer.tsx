import React, { FC } from "react";
import {
  useGetIssuingManagerLicenseCartableOfLicenseRequestByFilter,
  useGetOwnedUserUnionForUnionUnionIssuingManager,
} from "../../../../../../../core/services/api";
import { RequestList } from "../../Shared/RequestLists/RequestList";
import { columns } from "./Columns";

const MyCartableContainer: FC = () => {
  const getOwnedUserUnion: any =
    useGetOwnedUserUnionForUnionUnionIssuingManager();
  return (
    <>
      <RequestList
        getMutation={
          useGetIssuingManagerLicenseCartableOfLicenseRequestByFilter
        }
        columns={columns}
        getOwnedUnion={getOwnedUserUnion}
        flow="IssuingManagerLicenseIssuedFlow"
      />
    </>
  );
};

export { MyCartableContainer };
