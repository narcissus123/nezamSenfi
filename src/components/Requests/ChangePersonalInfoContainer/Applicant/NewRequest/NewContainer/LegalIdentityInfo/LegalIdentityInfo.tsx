import { Formik, Form } from "formik";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, FormGroup } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { ISetLegalIdentityInfo } from "../../../../../../../core/models";
import { useUserLagalIdentityById, useUserLegalIdentity } from "../../../../../../../core/services/api";
import { useChangeUserLegalIdentityInformationRequest, useChangeUserRealIdentityInformationRequest } from "../../../../../../../core/services/api/identity-change-request";
import { companyType, fullOption, ObjectPersianToEnglish, showToast } from "../../../../../../../core/utils";
import { LegalIdentityValidate } from "../../../../../../../core/validations/identitiy.validations";
import {
  FieldWrapper,
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { TwoColumn } from "../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

const LegalIdentityInfo: FC = () => {

  const { data, isFetching, isSuccess } = useUserLegalIdentity();

  const UpdateUser = useChangeUserLegalIdentityInformationRequest();
  
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

    UpdateUser.mutate(obj, {
      onSuccess:( val : any ) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
      }
    });
  };

  return isFetching ? (
    <FallBackSpinner />
  ) : (
    <>
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات هویتی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialState}
            enableReinitialize={true}
            validationSchema={LegalIdentityValidate}
            onSubmit={onSubmit}
          >
            {({ setFieldError }) => {
              return (
                <FieldWrapper
                  setFieldError={setFieldError}
                  useMutate={UpdateUser}
                >
                  {isFetching ? (
                    <>
                      <FallBackSpinner />
                    </>
                  ) : (
                    <>
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
                                disabled={true}
                                type="text"
                                placeholder="شناسه ملی"
                                significant
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
                                initialValue={
                                  initialState.companyRegistrationDate
                                }
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
                          initialValue={initialState}
                        />
                      </Form>
                    </>
                  )}
                </FieldWrapper>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { LegalIdentityInfo };
