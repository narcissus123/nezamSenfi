import React from 'react';
import { Formik ,Form } from 'formik';

import { TextInput } from '../../../common/Form';
import { SelectOption } from '../../../common/Form';
import { LegalRegisterButton } from './LegalRegisterButton';
import { legalRegisterValidation } from '../../../../core/validations/register-validation';
import { ILegalUser } from '../../../../core/models';
import { useRegisterContext } from '../RegisterContainer';
import { UseLegalRegister } from '../../../../core/services/api';
import { PasswordInput } from '../../../common/Form';
import { ObjectPersianToEnglish } from '../../../../core/utils';


const initialValues: ILegalUser = {
  name:"",
  companyType:undefined,
  email:"",
  userName:"",
  password:"",
  confirmPassword:""
}

const companyTypes = [
  {
    label: "نوع شرکت را انتخاب کنید",
    options: [
      { value: 1, label: "سهامی عام" },
      { value: 2, label: "سهامی خاص" },
      { value: 3, label: "مسئولیت محدود" },
      { value: 4, label: "تضامنی" },
      { value: 5, label: "مختلط غیرسهامی" },
      { value: 6, label: "مختلط سهامی" },
      { value: 7, label: "نسبی" },
      { value: 8, label: "تعاونی" },
    ],
  },
];

const LegalRegisterForm: React.FC = () => {

  const LegalRegisterMutation = UseLegalRegister()
  const {securityStamp,userInfoRegister} = useRegisterContext()

  const onSubmit = (value:ILegalUser) => {
    value = ObjectPersianToEnglish(value)           
    LegalRegisterMutation.mutate({...value,securityStamp})
  }

  return (  
    <>
      <div className="p-2"> 
        <Formik
            initialValues = {{...initialValues,userName:userInfoRegister.nationalId}}
            validationSchema = {legalRegisterValidation}
            onSubmit = {onSubmit}
            enableReinitialize={true}
          >
            <Form noValidate>           
              <TextInput lableText="نام" name="name" placeholder="نام" significant/>
              <SelectOption lableText="نوع شرکت" name="companyType"
                  placeHolder="نوع شرکت"           
                  data={companyTypes}
                  significant />
              <TextInput lableText="ایمیل" type="email" name="email" placeholder="مثلا name@email.com" significant/>         
              <TextInput  disabled={true} lableText="نام کاربری" name="userName" placeholder="نام کاربری" significant/>         
              <PasswordInput  lableText="کلمه عبور" name="password" placeholder="کلمه عبور" significant/> 
              <PasswordInput  lableText=" تکرار کلمه عبور " name="confirmPassword" placeholder=" تکرار کلمه عبور" significant/>         

              <LegalRegisterButton isLoading={LegalRegisterMutation.isLoading}/>
            </Form>          
        
        </Formik> 
      </div>
    </>
  );
}
 
export {LegalRegisterForm}