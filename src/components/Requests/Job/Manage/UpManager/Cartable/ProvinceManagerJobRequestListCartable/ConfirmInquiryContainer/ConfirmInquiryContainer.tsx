import React, { FC } from "react";

import { useGetProvinceGuildRoomPositionRequestInquiriesManager } from "../../../../../../../../core/services/api/position-request.api";
import { ManagerConfirmInquiry } from "../../ManagerConfirmInquiry/ManagerConfirmInquiry";

const ConfirmInquiryContainer: FC = () => {
  return (
    <>
      <ManagerConfirmInquiry
        from="Province"
        getMutation={useGetProvinceGuildRoomPositionRequestInquiriesManager}
        secretariatId={1}
      />
    </>
  );
};

export { ConfirmInquiryContainer };
