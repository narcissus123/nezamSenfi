import * as React from 'react';
import { EditOrganization } from '../../../../components/InqueryLetters/OrganizationContainer/EditOranization/EditOrganization';

export interface PersonalInfoProps {
  
}
 
const Edit: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <EditOrganization /> 
    </>
  );
}
 
export {Edit};