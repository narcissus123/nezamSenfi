import React, { FC } from "react";
import {
  useGetOwnedUserUnionForUnionUnionExpert,
  usePostGetExpertLicenseRequestCartableByFilter,
} from "../../../../../../../core/services/api";
import { RequestList } from "../../Shared/RequestLists/RequestList";
import { columns } from "./Columns";

const MyCartableContainer: FC = () => {
  const getOwnedUserUnion: any = useGetOwnedUserUnionForUnionUnionExpert();
  return (
    <>
      <RequestList
        getMutation={usePostGetExpertLicenseRequestCartableByFilter}
        columns={columns}
        flow="ExpertLicenseIssuedFlow"
        getOwnedUnion={getOwnedUserUnion}
      />
    </>
  );
};

export { MyCartableContainer };
