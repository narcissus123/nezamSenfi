import React from 'react';
import { Button, Spinner } from 'reactstrap';


export interface IPropsType {
  isLoading:boolean
}
 
const LegalRegisterButton: React.FC<IPropsType> = ({isLoading}) => {
  return (  
    <div className="d-flex justify-content-start">

      <Button disabled={isLoading} className="d-flex align-items-center justify-content-center" color="primary" type="submit">
        {isLoading && <Spinner color="white" size="sm"/>}     
        <span className="ml-50">ثبت نام</span>
      </Button>

    </div>
  );
}
 
export { LegalRegisterButton }