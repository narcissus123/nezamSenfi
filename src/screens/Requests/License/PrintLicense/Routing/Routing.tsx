import React, { FC } from "react";
import { RoutingContainer } from "../../../../../components/Requests/License/LicensePrint/RoutingContainer/RoutingContainer";
import { useReportRoutingMap } from "../../../../../core/services/api";

const Routing: FC = () => {
  return (
    <>
      <RoutingContainer getMutation={useReportRoutingMap} />
    </>
  );
};
export { Routing };

