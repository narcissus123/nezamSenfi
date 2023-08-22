import * as React from 'react';

import { ProvinceJobRequest as ProvinceJobRequestContainer} from '../../../../../components/Requests/Job/Applicant/Province/ProvinceJobRequest'

export interface PersonalInfoProps {
  
}
 
const ProvinceJobRequest: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <ProvinceJobRequestContainer />
    </>
  );
}
 
export {ProvinceJobRequest};