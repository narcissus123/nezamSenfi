import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { SubmitButton, TextInput } from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { useGetAllJobCategoryByJobSubSectionId, useGetAllJobClassByJobCategoryId, useGetAllJobSection, useGetAllJobSubSectionByJobSectionId } from "../../../../../../../../core/services/api";
import { addJobClassValidation, addJobSubClassValidation } from "../../../../../../../../core/validations/admin-job-tools.validation";

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
  });

  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [jobClass, setJobClass] = useState<any>([]);

  const editJob = editJobMutation();

  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();
  const getCategory = useGetAllJobCategoryByJobSubSectionId();
  const getJobClass = useGetAllJobClassByJobCategoryId();

  const onSectionChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobSectionId", e);
    setFieldValue("jobSubSectionId", null);
    setFieldValue("jobCategoryId", null);
    setFieldValue("jobClassId", null);
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
    }
  },[job])

  useEffect(() => {
    if (job) {
      setInitialValues({
        title: job.title,
        code: job.code,
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
      });
    }
  }, [job]);

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

  const onSubmit = (values: any) => {
    const editedJobObj = {
      id: job.id,
      code: values.code,
      title: values.title,
      jobClassId: values.jobClassId.value,
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
        validationSchema={addJobSubClassValidation}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ModalBody>
              <TextInput
                name="title"
                placeholder="عنوان را وارد کنید"
                lableText="عنوان"
                significant
              />
              <TextInput
                significant={true}
                lableText="کد"
                name="code"
                placeholder="کد را وارد کنید"
              />
              <BasicSelectOption
                data={sections}
                name="jobSectionId"
                lableText="بخش"
                significant
                isLoading={getSection.isLoading}
                placeHolder="بخش مورد نظر را انتخاب کنید"
                onChange={(e) => onSectionChange(e, setFieldValue)}
              />
              <BasicSelectOption
                data={subSections}
                name="jobSubSectionId"
                lableText="قسمت"
                significant
                isLoading={getSubSection.isLoading}
                placeHolder="قسمت مورد نظر را انتخاب کنید"
                onChange={(e: any) => onSubSectionChange(e, setFieldValue)}
              />
              <BasicSelectOption
                data={categories}
                name="jobCategoryId"
                lableText="گروه"
                significant
                isLoading={getCategory.isLoading}
                placeHolder="گروه مورد نظر را انتخاب کنید"
                onChange={(e) => onCategoryChange(e, setFieldValue)}
              />
              <BasicSelectOption
                data={jobClass}
                name="jobClassId"
                lableText="طبقه"
                significant
                isLoading={getJobClass.isLoading}
                placeHolder="طبقه مورد نظر را انتخاب کنید"
              />
            </ModalBody>

            <ModalFooter className="justify-content-start">
              <SubmitButton
                isLoading={editJob.isLoading}
                btnText="ویرایش"
                clearable
                clearableTxt="بازگشت"
                onClear={toggle}
                values={values}
                schema={addJobSubClassValidation}
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
