import React, { FC } from "react";
import {
  useGetIssuingResponsibleLicenseCartableOfLicenseRequestByFilter,
  useGetOwnedUserUnionForUnionUnionIssuingResponsible,
} from "../../../../../../../core/services/api";
import { RequestList } from "../../Shared/RequestLists/RequestList";
import { columns } from "./Columns";

const MyCartableContainer: FC = () => {
  const getOwnedUserUnion: any =
    useGetOwnedUserUnionForUnionUnionIssuingResponsible();

  return (
    <>
      <RequestList
        getMutation={
          useGetIssuingResponsibleLicenseCartableOfLicenseRequestByFilter
        }
        columns={columns}
        getOwnedUnion={getOwnedUserUnion}
        flow="IssuingResponsibleLicenseIssuedFlow"
      />
    </>
  );
};

export { MyCartableContainer };
