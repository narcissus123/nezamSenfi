import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { ICreateJobCategory } from "../../../../../../core/models";
import {
  useCreateJobCategory,
  useGetAllJobSection,
  useGetAllJobSubSectionByJobSectionId,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { addJobCategoryValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

interface IPropTypes {
  setRefetch: (val: any) => void;
}

const AddJobCategory: React.FC<IPropTypes> = ({ setRefetch }) => {
  const [initialValue, setInitialValue] = useState({
    jobSubSectionId: null,
    code: "",
    title: "",
    jobSectionId: null,
  });

  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);

  const createCategory = useCreateJobCategory();
  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();

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

  const onSectionChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobSectionId", e);
    setFieldValue("jobSubSectionId", null);
    getSubSection.mutate(e.value, {
      onSuccess: (val: any) => {
        const subSectionList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          subSectionList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setSubSections(subSectionList);
      },
    });
  };

  const onSubmit = (values: any, { resetForm }: any) => {
    const categoryObj: any = {
      code: values.code,
      title: values.title,
      jobSubSectionId: values.jobSubSectionId.value,
    };

    createCategory.mutate(categoryObj, {
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
        validationSchema={addJobCategoryValidation}
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
                    lableText="کد گروه"
                    name="code"
                    placeholder="کد زمینه فعالیت را وارد کنید"
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
                    onChange={(e) => onSectionChange(e, setFieldValue)}
                  />
                </Col>
                <Col md="4">
                  <BasicSelectOption
                    data={subSections}
                    name="jobSubSectionId"
                    lableText="قسمت"
                    significant
                    isLoading={getSubSection.isLoading}
                    placeHolder="قسمت مورد نظر را انتخاب کنید"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SubmitButton
                    isLoading={createCategory.isLoading}
                    initialValue={initialValue}
                    schema={addJobCategoryValidation}
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

export { AddJobCategory };
