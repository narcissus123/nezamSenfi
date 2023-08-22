import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  useGetSelcetOptionOfEnum,
} from "../../../../../../../core/services/api";
import { useHistory, useParams } from "react-router-dom";
import { showToast } from "../../../../../../../core/utils";
import {
  validationRejectModal,
  validationRejectModalWithTypeReason,
  validationRejectModalWithTypeReasonAterVisit,
} from "../../../../../../../core/validations/secretariat-check-job.validation";
import { SubmitButton, TextArea } from "../../../../../../common/Form";
import { FullOptionSel, OptionRow } from "../../../../../../../core/models";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop?: boolean;
  title?: string;
  rejectMutation: any;
  refetch: any;
  isSecondCheck?: boolean;
  rejectType?: string;
  isFromAfterVisit?: boolean;
}

const initialValue = {
  describe: "",
  type: null,
};

const ExpertCheckLicenseRejectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  title,
  rejectMutation,
  refetch,
  isSecondCheck = false,
  rejectType,
  isFromAfterVisit
}) => {
  const [state, setState] = useState(initialValue);
  const [typeOption, setTypeOption] = useState<FullOptionSel[]>([]);
  const history = useHistory();
  const carSupply = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "با کارشناس" },
        { value: 2, label: "با بهره بردار" },
      ],
    },
  ];
  let { id } = useParams<any>();

  const rejectMutate = rejectMutation();

  const rejectTypeQuery = useGetSelcetOptionOfEnum();

  useEffect(() => {
    if (rejectType) {
      rejectTypeQuery.mutate(rejectType, {
        onSuccess: (val) => {
          try {
            const result = val.data.result;
            let typeList: FullOptionSel[] = [
              { label: "انتخاب کنید...", options: [] },
            ];

            result.forEach((item: OptionRow) => {
              typeList[0].options.push({ value: +item.id, label: item.title });
            });

            setTypeOption(typeList);
          } catch (error) {}
        },
      });
    }
  }, [rejectType]);

  const onSubmit = (value: any) => {
    const rejectData : any = {
      licenseRequestId: id,
      description: value.describe,
      type: value.type ? value.type.value : 0,

    };

    if (isFromAfterVisit) {
      rejectData.carSupply = value.CarSupply.value;
    }

    rejectMutate.mutate(rejectData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        history.push("/ManageLicense/MyCartable");
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
            validationSchema={
              rejectType
                ? isFromAfterVisit
                  ? validationRejectModalWithTypeReasonAterVisit
                  : validationRejectModalWithTypeReason
                : validationRejectModal
            }
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  {rejectType && (
                    <BasicSelectOption
                      data={typeOption}
                      name="type"
                      isLoading={rejectTypeQuery.isLoading}
                      lableText="دلیل رد"
                      placeHolder="دلیل رد را انتخاب کنید..."
                      significant
                    />
                  )}
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    placeholder="توضیحات"
                  />
                  {isFromAfterVisit && (
                    <BasicSelectOption
                      data={carSupply}
                      name="CarSupply"
                      lableText="تامین خودرو"
                      significant
                      placeHolder="یک گزینه را انتخاب کنید"
                    />
                  )}

                  <div className="d-flex justify-content-start my-1">
                    <SubmitButton
                      isLoading={rejectMutate.isLoading}
                      btnText="رد درخواست"
                      clearable
                      clearableDisable={rejectMutate.isLoading}
                      clearableTxt="انصراف"
                      onClear={toggleModal}
                      values={values}
                      schema={
                        rejectType
                          ? validationRejectModalWithTypeReason
                          : validationRejectModal
                      }
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

export { ExpertCheckLicenseRejectModal };
