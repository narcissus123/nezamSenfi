import * as React from 'react';
import { CardWrapper } from '../../common/Wrapper/CardWrapper/CardWrapper';
import { AddInquery } from './AddInquery/AddInquery';
import { InqueryList } from './InqueryList/InqueryList';

export interface PersonalInfoProps {
  
}
 
const InqueryContainer: React.FC<PersonalInfoProps> = () => {
  return (
    <>
      <CardWrapper text="افزودن استعلام جدید">
        <AddInquery />
      </CardWrapper>
      <CardWrapper text="لیست استعلامات">
        <InqueryList />
      </CardWrapper>
    </>
  );
}
 
export {InqueryContainer};