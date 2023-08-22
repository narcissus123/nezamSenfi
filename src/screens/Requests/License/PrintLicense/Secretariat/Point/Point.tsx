import React, { FC } from "react";
import { PointContainer } from "../../../../../../components/Requests/License/LicensePrint/Point/PointContainer";
import { useReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat } from "../../../../../../core/services/api";

const Point: FC = () => {
  return (
    <>
      <PointContainer
        getMutation={
          useReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat
        }
      />
    </>
  );
};

export { Point };

