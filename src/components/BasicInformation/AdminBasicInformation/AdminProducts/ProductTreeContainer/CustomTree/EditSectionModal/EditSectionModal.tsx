import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { SubmitButton, TextInput } from "../../../../../../common/Form";
import * as Yup from "yup";
import { showToast } from "../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../core/enums";
import { UseMutationResult } from "react-query";
import { editJobSectionValidation } from "../../../../../../../core/validations/admin-job-tools.validation";
import { useEditJobSection } from "../../../../../../../core/services/api";

interface IPropTypes {
  job: any;
  isOpen: boolean;
  toggle: () => void;
  refetch: any;
}

const EditSectionModal: FC<IPropTypes> = ({ job, isOpen, toggle, refetch }) => {
  const [initialValues, setInitialValues] = useState<{
    title: string;
    code: string;
  }>({ title: "", code: "" });

  const editJob = useEditJobSection();

  useEffect(() => {
    if (job) {
      setInitialValues({
        title: job.title,
        code: job.code,
      });
    }
  }, [job]);

  const onSubmit = (values: any) => {
    const editedJobObj = {
      id: job.id,
      title: values.title,
      code: values.code,
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
      <ModalHeader toggle={toggle}>ویرایش بخش</ModalHeader>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={editJobSectionValidation}
      >
        {({ values }) => (
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
            </ModalBody>

            <ModalFooter className="justify-content-start">
              <SubmitButton
                isLoading={editJob.isLoading}
                btnText="ویرایش"
                clearable
                clearableTxt="بازگشت"
                onClear={toggle}
                values={values}
                schema={editJobSectionValidation}
                clearableDisable={editJob.isLoading}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { EditSectionModal };
