import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import * as Yup from "yup";
import { showToast } from "../../../../../../core/utils";
import { ToastTypes } from "../../../../../../core/enums";
import { UseMutationResult } from "react-query";

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
  const [initialValues, setInitialValues] = useState<{
    title: string;
    code: string;
  }>({ title: "", code: "" });

  const editJob = editJobMutation();

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
      backdrop={backdrop}
    >
      <ModalHeader toggle={toggle}>ویرایش</ModalHeader>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={schema}
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
