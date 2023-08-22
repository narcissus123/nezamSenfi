import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import {
  useCreateJobSubSection,
  useGetAllJobSection,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { addJobSubSectionValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

interface IPropTypes {
  setRefetch: (val: any) => void;
}

const AddJobSubSection: React.FC<IPropTypes> = ({ setRefetch }) => {
  const [initialValue, setInitialValue] = useState({
    code: "",
    title: "",
    jobSectionId: null,
  });

  const [sections, setSections] = useState<any>([]);

  const createSubSection = useCreateJobSubSection();
  const getSection = useGetAllJobSection();

  useEffect(() => {
    if (getSection.isSuccess) {
      const result: any = getSection.data;
      const sectionList: any = [
        {
          label: "یک گزینه را انتخاب کنید",
          options: [],
        },
      ];

      result.forEach((item: any) => {
        sectionList[0].options.push({
          value: item.id,
          label: item.title,
        });
      });
      setSections(sectionList);
    }
  }, [getSection.isSuccess]);

  const onSubmit = (values: any, { resetForm }: any) => {
    const subSectionObj: any = {
      code: values.code,
      title: values.title,
      jobSectionId: values.jobSectionId.value,
    };

    createSubSection.mutate(subSectionObj, {
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
        validationSchema={addJobSubSectionValidation}
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
                    lableText="کد قسمت"
                    name="code"
                    placeholder="کد قسمت را وارد کنید"
                  />
                </Col>
                <Col md="4">
                  <BasicSelectOption
                    data={sections}
                    name="jobSectionId"
                    lableText="بخش"
                    significant
                    isLoading={getSection.isLoading}
                    placeHolder="بخش مورد نظر را انتخاب کنید"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SubmitButton
                    isLoading={createSubSection.isLoading}
                    initialValue={initialValue}
                    schema={addJobSubSectionValidation}
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

export { AddJobSubSection };
