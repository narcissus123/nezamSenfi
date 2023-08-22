import * as React from 'react';
import { EditInquery } from '../../../../components/InqueryLetters/InqueryContainer/EditInquery/EditInquery';

export interface PersonalInfoProps {
  
}
 
const Edit: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <EditInquery /> 
    </>
  );
}
 
export {Edit};