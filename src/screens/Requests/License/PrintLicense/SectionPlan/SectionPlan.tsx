import React, { FC } from "react";
import { SectionPlanContainer } from "../../../../../components/Requests/License/LicensePrint/SectionPlanContainer/SectionPlanContainer";
import { useReportPlanSectionMapForUser } from "../../../../../core/services/api";

const SectionPlan: FC = () => {
  return (
    <>
      <SectionPlanContainer getMutation={useReportPlanSectionMapForUser} />
    </>
  );
};

export { SectionPlan };

