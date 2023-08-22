import * as React from "react";

import { EditJobRequestFlow } from "../../../../../components/Requests/Job/JobRequestFlow/EditJobRequestFlow/EditJobRequestFlow";

export interface PersonalInfoProps {}

const EditJobFlow: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <EditJobRequestFlow />
    </>
  );
};

export { EditJobFlow };
