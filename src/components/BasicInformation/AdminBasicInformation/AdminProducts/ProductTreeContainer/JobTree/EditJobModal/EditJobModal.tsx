import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { FullOptionSel, OptionRowSel } from "../../../../../../../core/models";
import {
  useEditJob,
  useGetAllJobCategoryByJobSubSectionId,
  useGetAllJobClassByJobCategoryId,
  useGetAllJobSection,
  useGetAllJobSubClassByJobClassId,
  useGetAllJobSubSectionByJobSectionId,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { editJobTreeValidation } from "../../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  job: any;
  isOpen: boolean;
  toggle: () => void;
  refetch: any;
}

const EditJobModal: FC<IPropTypes> = ({ job, isOpen, toggle, refetch }) => {
  const [initialValues, setInitialValues] = useState<{
    title: string;
    code: string;
    jobSectionId: OptionRowSel | null;
    jobSubSectionId: OptionRowSel | null;
    jobCategoryId: OptionRowSel | null;
    jobClassId: OptionRowSel | null;
    jobCategoryType: OptionRowSel | null;
    jobType: OptionRowSel | null;
    jobSubClassId: OptionRowSel | null;
  }>({
    title: "",
    code: "",
    jobSectionId: null,
    jobSubSectionId: null,
    jobCategoryId: null,
    jobClassId: null,
    jobType: null,
    jobCategoryType: null,
    jobSubClassId: null,
  });
  const [sections, setSections] = useState<FullOptionSel[]>([]);
  const [subSections, setSubSections] = useState<FullOptionSel[]>([]);
  const [categories, setCategories] = useState<FullOptionSel[]>([]);
  const [jobClass, setJobClass] = useState<any>([]);
  const [jobSubClass, setJobSubClass] = useState<any>([]);
  const [jobTypeData, setJobTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "خدماتی" },
        { value: 2, label: "تولیدی" },
        { value: 3, label: "تولیدی - خدماتی" },
      ],
    },
  ]);

  const [jobCategoryTypeData, setJobCategoryTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "فعالیتهای وابسته به ساختمان صنعتی" },
        { value: 2, label: "فعالیتهای وابسته به ساختمان سنتی وکارگاهی" },
        { value: 3, label: "فعالیتهای وابسته به سازه های سبک گلخانه صنعتی" },
        { value: 4, label: "فعالیتهای وابسته به سازه های سبک گلخانه سنتی" },
        { value: 5, label: "فعالیتهای وابسته به اراضی زراعی وباغی" },
        { value: 6, label: "فعالیتهای وابسته به ماشین الات وادوات" },
        { value: 7, label: "فعالیتهای  تخصصی یا مهارتی فاقد وابستگی مشخص " },
        { value: 8, label: "فعالیت های تولیدی مهاجر" },
      ],
    },
  ]);

  const editJob = useEditJob();
  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();
  const getCategory = useGetAllJobCategoryByJobSubSectionId();
  const getJobClass = useGetAllJobClassByJobCategoryId();
  const getJobSubClass = useGetAllJobSubClassByJobClassId();

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

  useEffect(() => {
    if (job) {
      try {
        setInitialValues({
          title: job.title,
          code: job.code,
          jobSectionId: job.jobSectionId
            ? { value: job.jobSectionId, label: job.jobSectionTitle }
            : null,
          jobSubSectionId: job.jobSubSectionId
            ? {
                value: job.jobSubSectionId,
                label: job.jobSubSectionTitle,
              }
            : null,
          jobCategoryId: job.jobCategoryId
            ? {
                value: job.jobCategoryId,
                label: job.jobCategoryTitle,
              }
            : null,
          jobClassId: job.jobClassId
            ? {
                value: job.jobClassId,
                label: job.jobClassTitle,
              }
            : null,
          jobSubClassId: job.jobSubClassId
            ? {
                value: job.jobSubClassId,
                label: job.jobSubClassTitle,
              }
            : null,
          jobType: job.jobType
            ? {
                value: job.jobType,
                label: "",
              }
            : null,
          jobCategoryType: job.jobCategoryType
            ? {
                value: job.jobCategoryType,
                label: "",
              }
            : null,
        });
        if (job.jobSectionId)
          getSubSection.mutate(job.jobSectionId, {
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

        if (job.jobSubSectionId)
          getCategory.mutate(job.jobSubSectionId, {
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

        if (job.jobCategoryId)
          getJobClass.mutate(job.jobCategoryId, {
            onSuccess: (val: any) => {
              const classList: any = [
                {
                  label: "یک گزینه را انتخاب کنید",
                  options: [],
                },
              ];

              val.forEach((item: any) => {
                classList[0].options.push({
                  value: item.id,
                  label: item.title,
                });
              });
              setJobClass(classList);
            },
          });

        if (job.jobClassId)
          getJobSubClass.mutate(job.jobClassId, {
            onSuccess: (val: any) => {
              const classList: any = [
                {
                  label: "یک گزینه را انتخاب کنید",
                  options: [],
                },
              ];

              val.forEach((item: any) => {
                classList[0].options.push({
                  value: item.id,
                  label: item.title,
                });
              });
              setJobSubClass(classList);
            },
          });
      } catch (error) {}
    }
  }, [job]);

  const onCategoryChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobCategoryId", e);
    setFieldValue("jobClassId", null);
    setFieldValue("jobSubClassId", null);
    getJobClass.mutate(e.value, {
      onSuccess: (val: any) => {
        const classList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          classList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setJobClass(classList);
      },
    });
  };

  const onSectionChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobSectionId", e);
    setFieldValue("jobSubSectionId", null);
    setFieldValue("jobCategoryId", null);
    setFieldValue("jobClassId", null);
    setFieldValue("jobSubClassId", null);
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
    setFieldValue("jobClassId", null);
    setFieldValue("jobSubClassId", null);
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

  const onSubmit = (values: any) => {
    const editedJobObj = {
      id: job.id,
      title: values.title,
      code: values.code,
      jobSubClassId: values.jobSubClassId.value,
      jobCategoryType: values.jobCategoryType.value,
      jobType: values.jobType.value,
    };

    editJob.mutate(editedJobObj, {
      onSuccess: (val: any) => {
        console.log(val.data);
        showToast(["با موفقیت ویرایش شد"], ToastTypes.success);
        toggle();
        refetch();
      },
    });
  };

  const onJobClassChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobClassId", e);
    setFieldValue("jobSubClassId", null);
    getJobSubClass.mutate(e.value, {
      onSuccess: (val: any) => {
        const classList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          classList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setJobSubClass(classList);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered"
      backdrop={true}
    >
      <ModalHeader toggle={toggle}>ویرایش عنوان فعالیت اقتصادی</ModalHeader>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={editJobTreeValidation}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ModalBody>
              <Row>
                <Col sm="6">
                  <TextInput
                    name="title"
                    placeholder="عنوان را وارد کنید"
                    lableText="عنوان"
                    significant
                  />
                </Col>
                <Col sm="6">
                  <TextInput
                    significant={true}
                    lableText="کد"
                    name="code"
                    placeholder="کد را وارد کنید"
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    name="jobSectionId"
                    data={sections}
                    significant
                    lableText="بخش"
                    onChange={(opt) => onSectionChange(opt, setFieldValue)}
                    placeHolder="انتخاب کنید..."
                    isLoading={getSection.isLoading}
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    name="jobSubSectionId"
                    data={subSections}
                    lableText="قسمت"
                    significant
                    placeHolder="انتخاب کنید..."
                    onChange={(opt) => onSubSectionChange(opt, setFieldValue)}
                    isLoading={getSubSection.isLoading}
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    name="jobCategoryId"
                    data={categories}
                    onChange={(opt) => onCategoryChange(opt, setFieldValue)}
                    lableText="گروه"
                    significant
                    placeHolder="انتخاب کنید..."
                    isLoading={getCategory.isLoading}
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    name="jobClassId"
                    data={jobClass}
                    significant
                    lableText="طبقه"
                    onChange={(opt) => onJobClassChange(opt, setFieldValue)}
                    placeHolder="انتخاب کنید..."
                    isLoading={getJobClass.isLoading}
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    name="jobSubClassId"
                    data={jobSubClass}
                    significant
                    lableText="زیر طبقه"
                    placeHolder="انتخاب کنید..."
                    isLoading={getJobSubClass.isLoading}
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    data={jobCategoryTypeData}
                    name="jobCategoryType"
                    lableText="دسته بندی شغل"
                    significant
                    isLoading={false}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    data={jobTypeData}
                    name="jobType"
                    lableText="نوع فعالیت"
                    significant
                    isLoading={false}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
              </Row>
            </ModalBody>

            <ModalFooter className="justify-content-start">
              <SubmitButton
                isLoading={editJob.isLoading}
                btnText="ویرایش"
                clearable
                clearableTxt="بازگشت"
                onClear={toggle}
                values={values}
                schema={editJobTreeValidation}
                clearableDisable={editJob.isLoading}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { EditJobModal };
