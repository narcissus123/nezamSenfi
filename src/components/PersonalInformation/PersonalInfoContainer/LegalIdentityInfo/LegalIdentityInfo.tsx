import React, { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import { Formik, Form } from "formik";

import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TextInput } from "../../../common/Form";
import { SubmitButton } from "../../../common/Form";
import { ISetLegalIdentityInfo } from "../../../../core/models";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { ModernDatePicker } from "../../../common/Form";
import { LegalIdentityValidate } from "../../../../core/validations/identitiy.validations";
import { ObjectPersianToEnglish } from "../../../../core/utils";
import {
  useUpdateUserLegalIdentity,
  useUserLegalIdentity,
} from "../../../../core/services/api";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { fullOption } from "../../../../core/utils";
import { companyType } from "../../../../core/utils";

import "react-toggle/style.css";
import { FieldWrapper } from "../../../common/Form";

export interface IdentityInfoProps {}

const LegalIdentityInfo: React.FC<IdentityInfoProps> = () => {
  const { data, isFetching, isSuccess } = useUserLegalIdentity();

  const [initialState, setInitialState] = useState<any>({
    nationalId: "",
    name: "",
    economicCode: "",
    registrationNumber: "",
    companyType: null,
    companyRegistrationDate: "",
    companyRegistrationPlace: "",
  });

  useEffect(() => {
    if (data && data.data) {
      const values = data.data.result;

      setInitialState({
        nationalId: values.nationalId,
        name: values.name,
        economicCode: values.economicCode,
        registrationNumber: values.registrationNumber,
        companyType: fullOption(values.companyType, companyType),
        companyRegistrationDate: values.companyRegistrationDate,
        companyRegistrationPlace: values.companyRegistrationPlace,
      });
    }
  }, [isSuccess]);

  const UpdateUser: any = useUpdateUserLegalIdentity();

  const onSubmit = async (values: any) => {
    values = ObjectPersianToEnglish(values);

    const obj: ISetLegalIdentityInfo = {
      nationalId: values.nationalId,
      name: values.name,
      economicCode: values.economicCode,
      registrationNumber: values.registrationNumber,
      companyType: values.companyType.value,
      companyRegistrationDate: values.companyRegistrationDate,
      companyRegistrationPlace: values.companyRegistrationPlace,
    };

    UpdateUser.mutate(obj);
  };

  return isFetching ? (
    <FallBackSpinner />
  ) : (
    <Formik
      initialValues={initialState}
      enableReinitialize={true}
      validationSchema={LegalIdentityValidate}
      onSubmit={(value) => onSubmit(value)} //will change default some to api call
    >
      {({ values, errors, handleChange, touched, setFieldError }) => {
        return (
          <FieldWrapper setFieldError={setFieldError} useMutate={UpdateUser}>
            <Form>
              <TwoColumn>
                <div>
                  <FormGroup>
                    <TextInput
                      lableText="نام شرکت"
                      name="name"
                      type="text"
                      placeholder="نام شرکت"
                      significant
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="شناسه ملی"
                      name="nationalId"
                      type="text"
                      placeholder="شناسه ملی"
                      significant
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="کد اقتصادی"
                      name="economicCode"
                      type="text"
                      placeholder="کد اقتصادی"
                      significant
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="شماره ثبت"
                      name="registrationNumber"
                      type="text"
                      placeholder="شماره ثبت"
                      significant
                    />
                  </FormGroup>
                </div>

                <div>
                  <FormGroup>
                    <ModernDatePicker
                      lableText="تاریخ ثبت شرکت"
                      name="companyRegistrationDate"
                      placeholder="تاریخ ثبت شرکت را وارد کنید"
                      significant
                      initialValue={initialState.companyRegistrationDate}
                    />
                  </FormGroup>

                  <FormGroup>
                    <BasicSelectOption
                      lableText="نوع شرکت"
                      significant={true}
                      name="companyType"
                      data={companyType}
                      placeHolder="انتخاب کنید..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="محل ثبت شرکت"
                      name="companyRegistrationPlace"
                      type="text"
                      placeholder="محل ثبت شرکت"
                      significant
                    />
                  </FormGroup>
                </div>
              </TwoColumn>

              <SubmitButton
                isLoading={UpdateUser.isLoading}
                nextTo="/PersonalInfo/LegalContactInfo"
                schema={LegalIdentityValidate}
                values={values}
                initialValue={initialState}
              />
            </Form>
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { LegalIdentityInfo };
