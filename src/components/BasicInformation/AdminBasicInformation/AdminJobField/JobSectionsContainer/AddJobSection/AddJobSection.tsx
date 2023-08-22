import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { useCreateJobSection } from "../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../core/utils";
import { addJobSectionValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

interface IPropTypes {
  setRefetch: (val: any) => void;
}

const AddJobSection: React.FC<IPropTypes> = ({ setRefetch }) => {
  const [initialValue, setInitialValue] = useState({
    code: "",
    title: "",
    jobSectionId: null,
  });

  const createSection = useCreateJobSection();

  const onSubmit = (values: any, { resetForm }: any) => {
    const subSectionObj: any = {
      code: values.code,
      title: values.title,
    };

    createSection.mutate(subSectionObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        resetForm();
        setRefetch((old: boolean) => !old);
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={addJobSectionValidation}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Row>
                <Col md="4">
                  <TextInput
                    name="title"
                    placeholder="عنوان را وارد کنید"
                    lableText="عنوان"
                    significant
                  />
                </Col>
                <Col md="4">
                  <TextInput
                    significant={true}
                    lableText="کد بخش"
                    name="code"
                    placeholder="کد بخش را وارد کنید"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SubmitButton
                    isLoading={createSection.isLoading}
                    initialValue={initialValue}
                    schema={addJobSectionValidation}
                    values={values}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddJobSection };
