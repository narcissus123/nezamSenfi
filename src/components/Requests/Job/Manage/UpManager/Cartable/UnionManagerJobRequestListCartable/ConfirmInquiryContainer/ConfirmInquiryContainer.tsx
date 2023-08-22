import React, { FC } from "react";

import { useGetCountyUnionPositionRequestInquiriesManager } from "../../../../../../../../core/services/api";
import { ManagerConfirmInquiry } from "../../ManagerConfirmInquiry/ManagerConfirmInquiry";

const ConfirmInquiryContainer: FC = () => {
  return (
    <>
      <ManagerConfirmInquiry
        from="Union"
        getMutation={useGetCountyUnionPositionRequestInquiriesManager}
        secretariatId={1}
      />
    </>
  );
};

export { ConfirmInquiryContainer };
