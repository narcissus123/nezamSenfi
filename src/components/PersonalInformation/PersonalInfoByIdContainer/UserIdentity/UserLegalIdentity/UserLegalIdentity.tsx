import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import "react-toggle/style.css";
import { CardTitle, FormGroup } from "reactstrap";
import { useUserLagalIdentityById } from "../../../../../core/services/api";
import { companyType, fullOption } from "../../../../../core/utils";
import { LegalIdentityValidate } from "../../../../../core/validations/identitiy.validations";
import { ModernDatePicker, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
  id: string;
}

const UserLegalIdentity: React.FC<IPropTypes> = ({ id }) => {
  const { data, isFetching, isSuccess } = useUserLagalIdentityById(+id);

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

  return isFetching ? (
    <FallBackSpinner />
  ) : (
    <>
      <CardTitle>اطلاعات هویتی</CardTitle>
      <Formik
        initialValues={initialState}
        enableReinitialize={true}
        validationSchema={LegalIdentityValidate}
        onSubmit={(value) => {}} //will change default some to api call
      >
        {({}) => {
          return (
            <Form>
              <TwoColumn>
                <div>
                  <FormGroup>
                    <TextInput
                      lableText="نام شرکت"
                      name="name"
                      type="text"
                      placeholder="نام شرکت"
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="شناسه ملی"
                      name="nationalId"
                      type="text"
                      placeholder="شناسه ملی"
                      disabled={true}
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="کد اقتصادی"
                      name="economicCode"
                      type="text"
                      placeholder="کد اقتصادی"
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextInput
                      lableText="شماره ثبت"
                      name="registrationNumber"
                      type="text"
                      placeholder="شماره ثبت"
                      disabled
                    />
                  </FormGroup>
                </div>

                <div>
                  <FormGroup>
                    <ModernDatePicker
                      lableText="تاریخ ثبت شرکت"
                      name="companyRegistrationDate"
                      placeholder="تاریخ ثبت شرکت را وارد کنید"
                      disabled
                      initialValue={initialState.companyRegistrationDate}
                    />
                  </FormGroup>

                  <FormGroup>
                    <BasicSelectOption
                      lableText="نوع شرکت"
                      isDisabled
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
                      disabled
                    />
                  </FormGroup>
                </div>
              </TwoColumn>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { UserLegalIdentity };
