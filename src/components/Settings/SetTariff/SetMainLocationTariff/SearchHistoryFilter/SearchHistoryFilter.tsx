import { Form, Formik } from "formik";
import React, { FC } from "react";
import { Col, Row } from "reactstrap";
import {
  ModernDatePicker,
  MoneyMask,
  SubmitButton,
} from "../../../../common/Form";

interface IPropTypes {
  onSubmit: (val: any) => void;
  isLoading: boolean;
}

const SearchHistoryFilter: FC<IPropTypes> = ({ onSubmit, isLoading }) => {
  return (
    <Formik
      initialValues={{ rate: "", createdAt: "", date: "" }}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue, values, resetForm }) => (
        <Form>
          <Row>
            <Col sm="3">
              <MoneyMask
                lableText="مبلغ"
                name="rate"
                errors={errors}
                touched={touched}
                value={values.rate}
                onChange={(val: string) => {
                  setFieldValue("rate", val);
                }}
                placeholder="مبلغ به ریال"
              />
            </Col>

            <Col sm="3">
              <ModernDatePicker
                name="createdAt"
                initialValue={values.createdAt}
                lableText="تاریخ ثبت"
                placeholder="...تاریخ ثبت را وارد کنید"
              />
            </Col>

            <Col sm="3">
              <ModernDatePicker
                name="date"
                initialValue={values.date}
                lableText="تاریخ اعمال"
                placeholder="...تاریخ اعمال را وارد کنید"
              />
            </Col>
          </Row>
          <SubmitButton
            isLoading={isLoading}
            clearable
            clearableTxt="پاکسازی"
            btnText="جستجو"
            onClear={resetForm}
            values={values}
          />
        </Form>
      )}
    </Formik>
  );
};

export { SearchHistoryFilter };
