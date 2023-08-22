import React from 'react';
import { LegalRegisterForm } from '../../../../components/Authentication/RegisterContainer/LegalRegisterForm/LegalRegisterForm';
import { RegisterWrapper } from '../../../../components/Authentication/RegisterContainer/RegisterWrapper/RegisterWrapper';

export interface IPropsProps {
  
}
 
const LegalUserRegister: React.FC<IPropsProps> = () => {
  return (  
    <RegisterWrapper>
       <LegalRegisterForm /> 
    </RegisterWrapper>
  );
}
 
export {LegalUserRegister};