import React from 'react';
import {BeneficiariContainer} from "../../components/BeneficiariContainer"
export interface PersonalInfoProps {
  
}
 
const Beneficiary: React.FC<PersonalInfoProps> = () => {
  return (  
    <>
      <BeneficiariContainer />
    </>
  );
}
 
export {Beneficiary};