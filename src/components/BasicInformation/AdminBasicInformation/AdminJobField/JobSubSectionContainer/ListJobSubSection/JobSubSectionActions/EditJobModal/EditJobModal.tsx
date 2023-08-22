import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import * as Yup from "yup";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { SubmitButton, TextInput } from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { useGetAllJobSection } from "../../../../../../../../core/services/api";
import { addJobSubSectionValidation } from "../../../../../../../../core/validations/admin-job-tools.validation";

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
    code: "",
    title: "",
    jobSectionId: null,
  });

  const [sections, setSections] = useState<any>([]);

  const editJob = editJobMutation();

  const getSection = useGetAllJobSection();

  useEffect(() => {
    if (job) {
      setInitialValues({
        title: job.title,
        code: job.code,
        jobSectionId: { value: job.jobSectionId, label: job.jobSectionTitle }
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
      jobSectionId: values.jobSectionId.value,
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
        validationSchema={addJobSubSectionValidation}
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
                schema={addJobSubSectionValidation}
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
