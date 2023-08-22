import React from "react";
import {
  useGetGuarantorsRequiermentOfCountyUnionPositionRequest,
  useSetCountyUnionAttachmentsAndGuarantors,
} from "../../../../../../../../core/services/api";

import { ContractDraftContainer } from "../ContractDraftContainer";

const UnionContract = () => {
  return (
    <>
      <ContractDraftContainer
        type="union"
        guarantorMutation={useSetCountyUnionAttachmentsAndGuarantors}
        guarantorsCountQuery={
          useGetGuarantorsRequiermentOfCountyUnionPositionRequest
        }
      />
    </>
  );
};

export { UnionContract };
