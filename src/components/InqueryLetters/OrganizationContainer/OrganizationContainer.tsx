import * as React from 'react';
import { CardWrapper } from '../../common/Wrapper/CardWrapper/CardWrapper';
import { AddOrganization } from './AddOrganization/AddOrganization';
import { OrganizationList } from './OrganizationList/OrganizationList';

export interface PersonalInfoProps {
  
}
 
const OrganizationContainer: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <CardWrapper text="افزودن سازمان جدید">
        <AddOrganization />
      </CardWrapper>
      <CardWrapper text="لیست سازمان ها">
        <OrganizationList />
      </CardWrapper>
    </>
  );
}
 
export {OrganizationContainer};