import React from "react";

import {
  useGetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest,
  useSetMainLocationGuildRoomAttachmentsAndGuarantors,
} from "../../../../../../../../core/services/api";
import { ContractDraftContainer } from "../ContractDraftContainer";

const MainLocationContract = () => {
  return (
    <>
      <ContractDraftContainer
        type="mainlocation"
        guarantorMutation={useSetMainLocationGuildRoomAttachmentsAndGuarantors}
        guarantorsCountQuery={
          useGetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest
        }
      />
    </>
  );
};

export { MainLocationContract };
