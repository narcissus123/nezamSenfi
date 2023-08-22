import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { ICreateJobCategory } from "../../../../../../core/models";
import {
  useCreateJobCategory,
  useCreateJobClass,
  useGetAllJobCategoryByJobSubSectionId,
  useGetAllJobSection,
  useGetAllJobSubSectionByJobSectionId,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import {
  addJobCategoryValidation,
  addJobClassValidation,
} from "../../../../../../core/validations/admin-job-tools.validation";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

interface IPropTypes {
  setRefetch: (val: any) => void;
}

const AddJobClass: React.FC<IPropTypes> = ({ setRefetch }) => {
  const [initialValue, setInitialValue] = useState({
    jobSubSectionId: null,
    code: "",
    title: "",
    jobSectionId: null,
    jobCategoryId: null,
  });

  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

  const createClass = useCreateJobClass();
  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();
  const getCategory = useGetAllJobCategoryByJobSubSectionId();

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
    setFieldValue("jobCategoryId", null);
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

  const onSubSectionChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobSubSectionId", e);
    setFieldValue("jobCategoryId", null);
    getCategory.mutate(e.value, {
      onSuccess: (val: any) => {
        const catgoriesList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          catgoriesList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setCategories(catgoriesList);
      },
    });
  };

  const onSubmit = (values: any, { resetForm }: any) => {
    const categoryObj: any = {
      code: values.code,
      title: values.title,
      jobCategoryId: values.jobCategoryId.value,
    };

    createClass.mutate(categoryObj, {
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
        validationSchema={addJobClassValidation}
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
                    lableText="کد طبقه"
                    name="code"
                    placeholder="کد طبقه را وارد کنید"
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
                    onChange={(e: any) => onSubSectionChange(e, setFieldValue)}
                  />
                </Col>
                <Col md="4">
                  <BasicSelectOption
                    data={categories}
                    name="jobCategoryId"
                    lableText="گروه"
                    significant
                    isLoading={getCategory.isLoading}
                    placeHolder="گروه مورد نظر را انتخاب کنید"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SubmitButton
                    isLoading={createClass.isLoading}
                    initialValue={initialValue}
                    schema={addJobClassValidation}
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

export { AddJobClass };
