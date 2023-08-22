import React from "react";
import { ServicesForm } from "./ServicesForm/ServicesForm";

interface IPropTypes {
  jobs: any[];
  useGetConsomptionTabs: any;
  isExpert?: boolean;
  isExpertUser?: boolean;
  isIssueingResponsible?: boolean;
  isJahadManager?: boolean;
}

const ConsumptionStatus: React.FC<IPropTypes> = ({
  jobs,
  useGetConsomptionTabs,
  isExpert = false,
  isIssueingResponsible = false,
  isJahadManager = false,
  isExpertUser
}) => {
  return (
    <>
      <ServicesForm
        jobs={jobs}
        useGetConsomptionTabs={useGetConsomptionTabs}
        isExpert={isExpert}
        isIssueingResponsible={isIssueingResponsible}
        isJahadManager={isJahadManager}
        isExpertUser={isExpertUser}
      />
    </>
  );
};

export { ConsumptionStatus };
