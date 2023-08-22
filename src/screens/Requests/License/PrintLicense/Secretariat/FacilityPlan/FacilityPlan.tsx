import React, { FC } from "react";
import { FacilityPlanContainer } from "../../../../../../components/Requests/License/LicensePrint/FacilityPlanContainer/FacilityPlanContainer";
import { useReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat } from "../../../../../../core/services/api";

const FacilityPlan: FC = () => {
  return (
    <>
      <FacilityPlanContainer getMutation={useReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat} />
    </>
  );
};

export { FacilityPlan };

