import React, { FC } from "react";

import { useGetCountyGuildRoomPositionRequestInquiriesManager } from "../../../../../../../../core/services/api/position-request.api";
import { ManagerConfirmInquiry } from "../../ManagerConfirmInquiry";

const ConfirmInquiryContainer: FC = () => {
  return (
    <>
      <ManagerConfirmInquiry
        from="County"
        getMutation={useGetCountyGuildRoomPositionRequestInquiriesManager}
        secretariatId={1}
      />
    </>
  );
};

export { ConfirmInquiryContainer };
