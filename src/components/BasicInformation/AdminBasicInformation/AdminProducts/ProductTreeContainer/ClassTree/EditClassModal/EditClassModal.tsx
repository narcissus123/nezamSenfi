import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { FullOptionSel, OptionRowSel } from "../../../../../../../core/models";
import {
  useEditJobClass,
  useGetAllJobCategoryByJobSubSectionId,
  useGetAllJobSection,
  useGetAllJobSubSectionByJobSectionId,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { editJobClassTreeValidation } from "../../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  job: any;
  isOpen: boolean;
  toggle: () => void;
  refetch: any;
}

const EditClassModal: FC<IPropTypes> = ({ job, isOpen, toggle, refetch }) => {
  const [initialValues, setInitialValues] = useState<{
    title: string;
    code: string;
    jobSectionId: OptionRowSel | null;
    jobSubSectionId: OptionRowSel | null;
    jobCategoryId: OptionRowSel | null;
  }>({
    title: "",
    code: "",
    jobSectionId: null,
    jobSubSectionId: null,
    jobCategoryId: null,
  });
  const [sections, setSections] = useState<FullOptionSel[]>([]);
  const [subSections, setSubSections] = useState<FullOptionSel[]>([]);
  const [categories, setCategories] = useState<FullOptionSel[]>([]);

  const editJob = useEditJobClass();
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
      } catch (error) {}
    }
  }, [job]);

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

  const onSubmit = (values: any) => {
    const editedJobObj = {
      id: job.id,
      title: values.title,
      code: values.code,
      jobSectionId: values.jobSectionId.value,
      jobSubSectionId: values.jobSubSectionId.value,
      jobCategoryId: values.jobCategoryId.value,
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
      backdrop={true}
    >
      <ModalHeader toggle={toggle}>ویرایش طبقه</ModalHeader>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={editJobClassTreeValidation}
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
                name="jobSectionId"
                data={sections}
                lableText="بخش"
                onChange={(opt) => onSectionChange(opt, setFieldValue)}
                placeHolder="انتخاب کنید..."
                isLoading={getSection.isLoading}
                significant
              />
              <BasicSelectOption
                name="jobSubSectionId"
                data={subSections}
                lableText="قسمت"
                placeHolder="انتخاب کنید..."
                onChange={(opt) => onSubSectionChange(opt, setFieldValue)}
                isLoading={getSubSection.isLoading}
                significant
              />
              <BasicSelectOption
                name="jobCategoryId"
                data={categories}
                lableText="گروه"
                placeHolder="انتخاب کنید..."
                isLoading={getCategory.isLoading}
                significant
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
                schema={editJobClassTreeValidation}
                clearableDisable={editJob.isLoading}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { EditClassModal };
