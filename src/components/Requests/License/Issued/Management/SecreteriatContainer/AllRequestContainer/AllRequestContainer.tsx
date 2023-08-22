import React, { FC } from "react";
import {
  useGetAllLicenseRequestBySecretariat,
  useGetOwnedUserUnionForSecretariat,
} from "../../../../../../../core/services/api";
import { RequestList } from "../../Shared/RequestLists/RequestList";
import { columns } from "./Columns";

const AllRequestContainer: FC = () => {
  const getOwnedUserUnion: any =
    useGetOwnedUserUnionForSecretariat();

  return (
    <>
      <RequestList
        getMutation={
          useGetAllLicenseRequestBySecretariat
        }
        columns={columns}
        getOwnedUnion={getOwnedUserUnion}
        flow="SecreteriatLicenseIssuedFlow"
      />
    </>
  );
};

export { AllRequestContainer };
