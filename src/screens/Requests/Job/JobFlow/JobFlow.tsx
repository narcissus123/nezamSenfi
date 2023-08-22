import * as React from 'react';

import { JobRequestFlow as JobRequestFlowContainer} from '../../../../components/Requests/Job/JobRequestFlow/JobRequestFlow'

export interface PersonalInfoProps {
  
}
 
const JobFlow: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <JobRequestFlowContainer />
    </>
  );
}
 
export {JobFlow};