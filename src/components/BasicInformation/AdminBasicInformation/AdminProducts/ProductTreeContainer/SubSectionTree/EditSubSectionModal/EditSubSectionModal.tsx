import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { OptionRowSel } from "../../../../../../../core/models";
import {
  useEditJobSubSection,
  useGetAllJobSection,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { editJobSubSectionTreeValidation } from "../../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  job: any;
  isOpen: boolean;
  toggle: () => void;
  refetch: any;
}

const EditSubSectionModal: FC<IPropTypes> = ({
  job,
  isOpen,
  toggle,
  refetch,
}) => {
  const [initialValues, setInitialValues] = useState<{
    title: string;
    code: string;
    jobSectionId: OptionRowSel | null;
  }>({ title: "", code: "", jobSectionId: null });
  const [sections, setSections] = useState<any>([]);

  const editJob = useEditJobSubSection();
  const getSection = useGetAllJobSection();

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
      setInitialValues({
        title: job.title,
        code: job.code,
        jobSectionId: { value: job.jobSectionId, label: job.jobSectionTitle },
      });
    }
  }, [job]);

  const onSubmit = (values: any) => {
    const editedJobObj = {
      id: job.id,
      title: values.title,
      code: values.code,
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
      backdrop={true}
    >
      <ModalHeader toggle={toggle}>ویرایش قسمت</ModalHeader>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={editJobSubSectionTreeValidation}
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
              <BasicSelectOption
                name="jobSectionId"
                data={sections}
                lableText="بخش"
                placeHolder="انتخاب کنید..."
                isLoading={getSection.isLoading}
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
                schema={editJobSubSectionTreeValidation}
                clearableDisable={editJob.isLoading}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { EditSubSectionModal };
