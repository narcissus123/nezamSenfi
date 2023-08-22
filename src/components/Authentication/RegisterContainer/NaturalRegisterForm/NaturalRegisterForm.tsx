import React from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../common/Form";
import { NaturalRegisterButton } from "./NaturalRegisterButton";
import { NaturalRegisterValidation } from "../../../../core/validations/register-validation";
import { IRealUser } from "../../../../core/models";
import { useRegisterContext } from "../RegisterContainer";
import { UseRealRegister } from "../../../../core/services/api";
import { PasswordInput } from "../../../common/Form";
import { ObjectPersianToEnglish } from "../../../../core/utils";


const initialValues: IRealUser = {
  username: "",
  name: "",
  password: "",
  confirmPassword: "",
  email: "",
  lastName: "",
};

const NaturalRegisterForm: React.FC = () => {
  const RealRegisterMutation = UseRealRegister();
  const { securityStamp, userInfoRegister } = useRegisterContext();

  const onSubmit = (value: IRealUser) => {
    value = ObjectPersianToEnglish(value);
    RealRegisterMutation.mutate({ ...value, securityStamp: securityStamp });
  };

  return (
    <>
      <div className="p-2">
        <Formik
          initialValues={{
            ...initialValues,
            username: userInfoRegister.nationalCode,
          }}
          validationSchema={NaturalRegisterValidation}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form noValidate>
            <TextInput
              lableText="نام"
              name="name"
              placeholder="نام"
              significant
            />
            <TextInput
              lableText="نام خانوادگی"
              name="lastName"
              placeholder="نام خانوادگی"
              significant
            />
            <TextInput
              lableText="ایمیل"
              type="email"
              name="email"
              placeholder="مثلا name@email.com"
              significant
            />
            <TextInput
              className="notAllowed badge-danger"
              disabled={true}
              lableText="نام کاربری"
              name="username"
              placeholder="نام کاربری"
              significant
            />
            <PasswordInput
              lableText="کلمه عبور"
              name="password"
              placeholder="کلمه عبور"
              significant
            />
            <PasswordInput
              lableText=" تکرار کلمه عبور "
              name="confirmPassword"
              placeholder=" تکرار کلمه عبور"
              significant
            />

            <NaturalRegisterButton isLoading={RealRegisterMutation.isLoading} />
          </Form>
        </Formik>
      </div>
    </>
  );
};

export { NaturalRegisterForm };
