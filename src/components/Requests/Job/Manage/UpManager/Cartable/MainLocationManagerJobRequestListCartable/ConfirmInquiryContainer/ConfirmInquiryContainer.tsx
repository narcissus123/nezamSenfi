import React, { FC } from "react";

import { useGetMainLocationGuildRoomPositionRequestInquiriesManager } from "../../../../../../../../core/services/api/position-request.api";
import { ManagerConfirmInquiry } from "../../ManagerConfirmInquiry/ManagerConfirmInquiry";

const ConfirmInquiryContainer: FC = () => {
  return (
    <>
      <ManagerConfirmInquiry
        from="MainLocation"
        getMutation={useGetMainLocationGuildRoomPositionRequestInquiriesManager}
        secretariatId={1}
      />
    </>
  );
};

export { ConfirmInquiryContainer };
