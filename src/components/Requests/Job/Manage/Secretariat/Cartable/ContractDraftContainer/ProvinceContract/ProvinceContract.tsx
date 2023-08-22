import React, { FC } from "react";

import {
  useGetGuarantorsRequiermentOfProvinceGuildRoomPositionRequest,
  useSetProvinceGuildRoomAttachmentsAndGuarantors,
} from "../../../../../../../../core/services/api";
import { ContractDraftContainer } from "../ContractDraftContainer";

const ProvinceContract: FC = (): JSX.Element => {
  return (
    <>
      <ContractDraftContainer
        type="province"
        guarantorMutation={useSetProvinceGuildRoomAttachmentsAndGuarantors}
        guarantorsCountQuery={
          useGetGuarantorsRequiermentOfProvinceGuildRoomPositionRequest
        }
      />
    </>
  );
};

export { ProvinceContract };
