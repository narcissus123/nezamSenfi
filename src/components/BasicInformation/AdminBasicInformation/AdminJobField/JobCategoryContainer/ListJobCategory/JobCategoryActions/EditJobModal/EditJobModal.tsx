import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { SubmitButton, TextInput } from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { useGetAllJobSection, useGetAllJobSubSectionByJobSectionId } from "../../../../../../../../core/services/api";

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
  });

  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);

  const editJob = editJobMutation();

  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();

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

  useEffect(() => {
    if (job) {
      setInitialValues({
        title: job.title,
        code: job.code,
        jobSubSectionId: {
          value: job.jobSubSectionId,
          label: job.jobSubSectionTitle,
        },
        jobSectionId: {
          value: job.jobSectionId,
          label: job.jobSectionTitle,
        },
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
    }
  },[job])


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
      jobSubSectionId: values.jobSubSectionId.value,
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
        validationSchema={schema}
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
                schema={schema}
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
