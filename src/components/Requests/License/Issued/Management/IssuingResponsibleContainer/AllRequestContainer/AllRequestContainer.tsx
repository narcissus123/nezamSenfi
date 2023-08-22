import React, { FC } from "react";
import {
  useGetAllWaitingForIssuingResponsibleLicenseRequestByUnionId,
  useGetOwnedUserUnionForUnionUnionIssuingResponsible,
} from "../../../../../../../core/services/api";
import { RequestList } from "../../Shared/RequestLists/RequestList";
import { columns } from "./Columns";
import { ListFilter } from "./ListFilter";

const AllRequestContainer: FC = () => {
  const getOwnedUserUnion: any =
    useGetOwnedUserUnionForUnionUnionIssuingResponsible();

  return (
    <>
      <RequestList
        getMutation={
          useGetAllWaitingForIssuingResponsibleLicenseRequestByUnionId
        }
        columns={columns}
        getOwnedUnion={getOwnedUserUnion}
        flow="IssuingResponsibleLicenseIssuedFlow"
        ownedListFilter={ListFilter}
      />
    </>
  );
};

export { AllRequestContainer };
