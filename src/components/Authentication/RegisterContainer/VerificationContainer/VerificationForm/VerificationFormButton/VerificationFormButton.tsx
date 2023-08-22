import React from 'react';
import { Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useRegisterContext } from '../../../RegisterContainer';
import { useReSendSms } from '../../../../../../core/services/api';
import { ObjectPersianToEnglish } from '../../../../../../core/utils';

export interface IPropsType {
  isLoading:boolean
  isRunning:boolean
  reStart?:any
}
 
const VerificationFormButton: React.FC<IPropsType> = ({isLoading,isRunning,reStart}) => {

  const {userInfoRegister} = useRegisterContext()
  const reSendSmsMutation = useReSendSms()

  const sendSMS = () => {
    reSendSmsMutation.mutate(ObjectPersianToEnglish(userInfoRegister),{
      onSuccess:() => {
        const stopWatchOffset = new Date();
        const startTime = stopWatchOffset.setSeconds(stopWatchOffset.getSeconds() + 300);      
        reStart(startTime)
      }
    })
  }
  
  return (  
    <div className="d-flex justify-content-start">
      <div className="d-flex justify-content-start">
          {
            isRunning 
            ? 
            <Button disabled={isLoading} className="d-flex align-items-center justify-content-center" color="primary" type="submit">
              {isLoading && <Spinner color="white" size="sm"/>}     
              <span className="ml-50">تایید</span>
            </Button>
            : 
            <Button className="d-flex align-items-center justify-content-center" color="primary" type="button" onClick={() => sendSMS()}>
              {reSendSmsMutation.isLoading && <Spinner color="white" size="sm"/>}     
              <span className="ml-50">ارسال دوباره</span>
            </Button>
          }
         <Link
            to="/Register"
            color="primary"
            className="btn btn-outline-primary ml-1"
          >
            بازگشت
          </Link>
      </div>
    </div>
  );
}
 
export {VerificationFormButton};