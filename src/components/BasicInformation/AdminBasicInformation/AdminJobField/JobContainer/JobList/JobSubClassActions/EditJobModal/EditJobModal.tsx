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
import * as Yup from "yup";
import { ToastTypes } from "../../../../../../../../core/enums";
import { OptionRowSel } from "../../../../../../../../core/models";
import {
  useAllUseTypes,
  useGetAllJobCategoryByJobSubSectionId,
  useGetAllJobClassByJobCategoryId,
  useGetAllJobSection,
  useGetAllJobSubClassByJobClassId,
  useGetAllJobSubSectionByJobSectionId,
} from "../../../../../../../../core/services/api";
import { fullOption, showToast } from "../../../../../../../../core/utils";
import { addJobValidation } from "../../../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  job: any;
  isOpen: boolean;
  toggle: () => void;
  backdrop: boolean;
  schema: Yup.ObjectSchema<any>;
  editJobMutation: any;
  refetch: any;
}

const EditJobModal: FC<IPropTypes> = ({
  job,
  isOpen,
  toggle,
  backdrop,
  schema,
  editJobMutation,
  refetch,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    jobSubSectionId: null,
    code: "",
    title: "",
    jobSectionId: null,
    jobCategoryId: null,
    jobClassId: null,
    jobSubClassId: null,
    useTypeId: null,
    jobType: null,
    jobCategoryType: null,
  });
  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [jobClass, setJobClass] = useState<any>([]);
  const [jobSubClass, setJobSubClass] = useState<any>([]);
  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

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

  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();
  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();
  const getCategory = useGetAllJobCategoryByJobSubSectionId();
  const getJobClass = useGetAllJobClassByJobCategoryId();
  const getJobSubClass = useGetAllJobSubClassByJobClassId();

  useEffect(() => {
    if (useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((useType: any) => {
        pro[0].options.push({
          value: useType.id,
          label: useType.title,
          useTypeEnum: useType.useTypeEnum,
        });
      });
      setUseTypeData(pro);
      
    }
  }, [useTypesIsSuccess]);

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
    setFieldValue("jobClassId", null);
    setFieldValue("jobCategoryId", null);
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

  const editJob = editJobMutation();

  useEffect(() => {
    if (job) {
      setInitialValues({
        title: job.title,
        code: job.code,
        jobType: fullOption(job.jobType, jobTypeData),
        jobCategoryType: fullOption(job.jobCategoryType, jobCategoryTypeData),
        jobSectionId: { value: job.jobSectionId, label: job.jobSectionTitle },
        jobSubSectionId: {
          value: job.jobSubSectionId,
          label: job.jobSubSectionTitle,
        },
        jobCategoryId: {
          value: job.jobCategoryId,
          label: job.jobCategoryTitle,
        },
        jobClassId: { value: job.jobClassId, label: job.jobClassTitle },
        jobSubClassId: {
          value: job.jobSubClassId,
          label: job.jobSubClassTitle,
        },
        useTypeId: { value: job.useTypeId, label: job.useTypeTitle },
      });
    }
  }, [job]);

  useEffect(()=>{
    if(job){
      if (job.jobSectionId) {
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
      }
      if (job.jobSubSectionId) {
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
      }

      if (job.jobCategoryId) {
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
      }
      if (job.jobSubClassId) {
        getJobSubClass.mutate(job.jobSubClassId, {
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
      }
    }
  },[job])

  const onSubmit = (values: any) => {
    const categoryObj: any = {
      id: job.id,
      code: values.code,
      title: values.title,
      jobSubClassId: values.jobSubClassId.value,
      useTypeId: values.useTypeId.value,
      jobType: values.jobType.value,
      jobCategoryType: values.jobCategoryType.value,
    };

    editJob.mutate(categoryObj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت ویرایش شد"], ToastTypes.success);
        toggle();
        refetch();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered"
      backdrop={backdrop}
    >
      <ModalHeader toggle={toggle}>ویرایش</ModalHeader>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={addJobValidation}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ModalBody>
              <Row>
                <Col md="12">
                  <TextInput
                    name="title"
                    placeholder="عنوان را وارد کنید"
                    lableText="عنوان"
                    significant
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <TextInput
                    significant={true}
                    lableText="کد"
                    name="code"
                    placeholder="کد را وارد کنید"
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <BasicSelectOption
                    data={jobCategoryTypeData}
                    name="jobCategoryType"
                    lableText="دسته بندی شغل"
                    significant
                    isLoading={getJobSubClass.isLoading}
                    placeHolder="انتخاب کنید ..."
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
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

              <Row>
                <Col md="12">
                  <BasicSelectOption
                    data={useTypeData}
                    name="useTypeId"
                    lableText="نوع کاربری"
                    significant
                    isLoading={useTypesIsFetching}
                    placeHolder="بخش مورد نظر را انتخاب کنید"
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
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
              </Row>
              <Row>
                <Col md="12">
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
              </Row>
              <Row>
                <Col md="12">
                  <BasicSelectOption
                    data={categories}
                    name="jobCategoryId"
                    lableText="گروه"
                    significant
                    isLoading={getCategory.isLoading}
                    placeHolder="گروه مورد نظر را انتخاب کنید"
                    onChange={(e) => onCategoryChange(e, setFieldValue)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <BasicSelectOption
                    data={jobClass}
                    name="jobClassId"
                    lableText="طبقه"
                    significant
                    isLoading={getJobClass.isLoading}
                    placeHolder="طبقه مورد نظر را انتخاب کنید"
                    onChange={(e) => onJobClassChange(e, setFieldValue)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <BasicSelectOption
                    data={jobSubClass}
                    name="jobSubClassId"
                    lableText="زیر طبقه ها"
                    significant
                    isLoading={getJobSubClass.isLoading}
                    placeHolder="زیر طبقه مورد نظر را انتخاب کنید"
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
                schema={addJobValidation}
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
