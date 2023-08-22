import React from "react";

import {
  useGetGuarantorsRequiermentOfCountyGuildRoomPositionRequest,
  useSetCountyGuildRoomAttachmentsAndGuarantors,
} from "../../../../../../../../core/services/api";
import { ContractDraftContainer } from "../ContractDraftContainer";

const CountyContract = () => {
  return (
    <>
      <ContractDraftContainer
        type="county"
        guarantorMutation={useSetCountyGuildRoomAttachmentsAndGuarantors}
        guarantorsCountQuery={
          useGetGuarantorsRequiermentOfCountyGuildRoomPositionRequest
        }
      />
    </>
  );
};

export { CountyContract };
