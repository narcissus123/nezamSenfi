import * as React from 'react';

import { MainLocationJobRequest as MainLocationJobRequestContainer} from '../../../../../components/Requests/Job/Applicant/MainLocation/MainLocationJobRequest'

export interface PersonalInfoProps {
  
}
 
const MainLocationJobRequest: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <MainLocationJobRequestContainer />
    </>
  );
}
 
export {MainLocationJobRequest};