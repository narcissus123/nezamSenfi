import { Form, Formik } from "formik";
import React, { FC } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { SetSecretariatNumberValidation } from "../../../../../../../core/validations/set-secretariat-number.validations";
import {
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../../common/Form";
import { TwoColumn } from "../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

const SetSecretariatNumber: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت شماره دبیرخانه و بایگانی</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{ secretariatNumber: "", secretariatDate: "" }}
          onSubmit={() => {}}
          enableReinitialize
          validationSchema={SetSecretariatNumberValidation}
        >
          {({ values }) => (
            <Form>
              <TwoColumn>
                <TextInput
                  name="secretariatNumber"
                  placeholder="شماره اندیکاتوری دبیرخانه را وارد کنید"
                  hasLabel
                  lableText="شماره اندیکاتوری دبیرخانه"
                  significant
                />

                <ModernDatePicker
                  name="secretariatDate"
                  hasLabel
                  hasMaximum={false}
                  significant
                  placeholder="تاریخ اندیکاتوری دبیرخانه را وارد کنید"
                  lableText="تاریخ اندیکاتوری دبیرخانه"
                />
              </TwoColumn>
              <SubmitButton
                isLoading={false}
                btnText="ثبت"
                values={values}
                schema={SetSecretariatNumberValidation}
              />
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export { SetSecretariatNumber };
