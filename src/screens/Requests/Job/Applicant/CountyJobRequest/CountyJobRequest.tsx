import * as React from 'react';

import { CountyJobRequest  as CountyJobRequestContainer} from '../../../../../components/Requests/Job/Applicant/County/CountyJobRequest'

export interface PersonalInfoProps {
  
}
 
const CountyJobRequest: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <CountyJobRequestContainer />
    </>
  );
}
 
export {CountyJobRequest};