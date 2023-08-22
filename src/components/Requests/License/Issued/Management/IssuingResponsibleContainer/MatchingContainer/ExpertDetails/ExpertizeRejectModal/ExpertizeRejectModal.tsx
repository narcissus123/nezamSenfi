import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  FullOptionSel,
  OptionRow,
} from "../../../../../../../../../core/models";
import { useGetSelcetOptionOfEnum } from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { validationRejectModalWithNo, validationRejectModalWithReason } from "../../../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton, TextArea } from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  rejectMutation: any;
  refetch: any;
}

const initialValue = {
  describe: "",
};

const ExpertizeRejectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  rejectMutation,
  refetch,
}) => {
  const [state, setState] = useState(initialValue);
  const [reasonType, setReasonType] = useState<FullOptionSel[]>([]);
  const history = useHistory();

  let { req_id } = useParams<any>();

  const rejectMutate = rejectMutation();
  const rejectReason = useGetSelcetOptionOfEnum();

  useEffect(() => {
    rejectReason.mutate("RejectExpertMatchingReasonTypeEnum", {
      onSuccess: (val) => {
        const result = val.data.result;

        let reason: FullOptionSel[] = [
          { label: "یک گزینه را انتخاب کنید...", options: [] },
        ];
        if (result) {
          result.forEach((item: OptionRow) => {
            reason[0].options.push({ value: +item.id, label: item.title });
          });

          setReasonType(reason);
        }
      },
    });
  }, []);

  const onSubmit = (value: any) => {
    const rejectData = {
      licenseRequestId: +req_id,
      description: value.describe,
      type: 1
    };
    rejectMutate.mutate(rejectData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        refetch();
        toggleModal();
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={state}
            validationSchema={validationRejectModalWithNo}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    placeholder="توضیحات"
                    significant
                  />
                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={rejectMutate.isLoading}
                      btnText="رد"
                      clearable
                      clearableDisable={rejectMutate.isLoading}
                      clearableTxt="انصراف"
                      onClear={toggleModal}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export { ExpertizeRejectModal };
