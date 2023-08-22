import React, { FC } from "react";
import { RoutingContainer } from "../../../../../../components/Requests/License/LicensePrint/RoutingContainer/RoutingContainer";
import { useReportRoutingMapForUnionIssuingResponsibleAndUnionSecretariat } from "../../../../../../core/services/api";

const Routing: FC = () => {
  return (
    <>
      <RoutingContainer getMutation={useReportRoutingMapForUnionIssuingResponsibleAndUnionSecretariat} />
    </>
  );
};
export { Routing };

