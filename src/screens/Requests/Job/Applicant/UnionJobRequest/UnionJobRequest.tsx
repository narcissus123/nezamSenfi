import * as React from 'react';

import { UnionJobRequest as UnionJobRequestContainer} from '../../../../../components/Requests/Job/Applicant/Union/UnionJobRequest'

export interface UnionJobRequestProps {
  
}
 
const UnionJobRequest: React.FC<UnionJobRequestProps> = () => {
  return (  
    <>
      <UnionJobRequestContainer />
    </>
  );
}
 
export {UnionJobRequest};