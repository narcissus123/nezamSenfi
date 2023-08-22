import React, { useEffect } from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../common/Form";
import { RegisterFormButton } from "./RegisterFormButton";
import { registerValidation } from "../../../../core/validations/register-validation";
import { DependentInput } from "../../../common/Wrapper/DependentInput/DependentInput";
import { SelectOption } from "../../../common/Form";

import { AddPotentialUserQuery } from "../../../../core/services/api";
import { useRegisterContext } from "../RegisterContainer";
import { ObjectPersianToEnglish } from "../../../../core/utils";
import { FieldWrapper } from "../../../common/Form";

const RegisterForm: React.FC = () => {
  const userTypes = [
    {
      label: "",
      options: [
        { value: 1, label: "حقیقی" },
        { value: 2, label: "حقوقی" },
      ],
    },
  ];

  const addPotentialUserMutation = AddPotentialUserQuery();
  const {
    userInfoRegister: initialValues,
    setUserInfoRegister,
  } = useRegisterContext();

  const onSubmit = (value: any) => {
    value = ObjectPersianToEnglish(value);
    setUserInfoRegister(value);
    addPotentialUserMutation.mutate(value);
  };

  useEffect(() => {
    if (addPotentialUserMutation.data && addPotentialUserMutation.data.data) {
      const result = addPotentialUserMutation.data.data.result;
    }
  }, [addPotentialUserMutation.isSuccess]);

  return (
    <div className="p-2">
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidation}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(props) => (
          <FieldWrapper
            setFieldError={props.setFieldError}
            useMutate={addPotentialUserMutation}
          >
            <Form>
              <SelectOption
                lableText="نوع شخصیت"
                name="userType"
                data={userTypes}
                significant
              />

              <DependentInput
                mainField={props.values.userType}
                dependentValue={1}
              >
                <TextInput
                  id="nationalCode"
                  lableText="کد ملی"
                  name="nationalCode"
                  placeholder="کد ملی"
                  significant
                />
              </DependentInput>

              <DependentInput
                mainField={props.values.userType}
                dependentValue={2}
              >
                <TextInput
                  lableText="شناسه ملی"
                  name="nationalId"
                  id="nationalId"
                  placeholder="شناسه ملی"
                  significant
                />
              </DependentInput>

              <TextInput
                lableText="موبایل"
                type="tell"
                name="cellphone"
                placeholder="مثلا 09111231234"
                significant
              />

              <RegisterFormButton
                isLoading={addPotentialUserMutation.isLoading}
              />
            </Form>
          </FieldWrapper>
        )}
      </Formik>
    </div>
  );
};

export { RegisterForm };
