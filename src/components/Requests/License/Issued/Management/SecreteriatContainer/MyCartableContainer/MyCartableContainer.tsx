import React, { FC } from "react";
import {
  useGetOwnedUserUnionForSecretariat,
  useGetSecretariatLicenseRequestCartableByFilter,
} from "../../../../../../../core/services/api";
import { RequestList } from "../../Shared/RequestLists/RequestList";
import { columns } from "./Columns";

const MyCartableContainer: FC = () => {
  const getOwnedUserUnion: any = useGetOwnedUserUnionForSecretariat();

  return (
    <>
      <RequestList
        getMutation={
          useGetSecretariatLicenseRequestCartableByFilter
        }
        columns={columns}
        getOwnedUnion={getOwnedUserUnion}
        flow="SecreteriatLicenseIssuedFlow"
      />
    </>
  );
};

export { MyCartableContainer };
