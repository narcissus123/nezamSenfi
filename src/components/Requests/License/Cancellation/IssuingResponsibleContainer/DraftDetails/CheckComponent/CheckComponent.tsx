import React, { useState } from "react";

import { RejectModal } from "../RejectModal";
import { ConfirmModal } from "../ConfirmModal";
import { SimpleSubmitButton, SubmitButton } from "../../../../../../common/Form";
import { useHistory, useParams } from "react-router-dom";
import { showToast } from "../../../../../../../core/utils";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { useRejectDocumentCancellationByIsuuingResponsible } from "../../../../../../../core/services/api/cancelation.api";
import { Col, Row } from "reactstrap";
import { RejectDocumentModal } from "../RejectDocumentModal/RejectDocumentModal";

export interface IPropsType {
  acceptMutation: any;
  rejectMutation: any;
  refetch: any;
}
const CheckComponent: React.FC<IPropsType> = ({
  acceptMutation,
  rejectMutation,
  refetch,
}) => {
  const [showCheckModal, setShowCheckModal] = useState<any>(false);
  const [showCancelModal, setShowCancelModal] = useState<any>(false);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showRejection, setShowRejectionModal] = useState<boolean>(false);

  const history = useHistory();
  const { id : req_id } = useParams<any>();

  const confirmMutation = acceptMutation();
  const rejectMutate = rejectMutation();
  const rejectDocumentsMutation = useRejectDocumentCancellationByIsuuingResponsible()
  
  const onSubmitAccept = () => {
    const confirmData = {
      licenseRequestId: +req_id,
    };
    confirmMutation.mutate(confirmData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], "success");
        history.push("/ManageLicense/IssuingResponsible/MyCartable");
      },
    });
  };

  const onSubmitReject = () => {
   
  };

  return (
    <>
      <ConfirmModal
        acceptMutation={acceptMutation}
        isOpen={showCheckModal}
        refetch={refetch}
        title="تایید درخواست"
        toggleModal={() => setShowCheckModal((val: any) => !val)}
      />

      <RejectDocumentModal
        refetch={refetch}
        rejectMutation={useRejectDocumentCancellationByIsuuingResponsible}
        title="رد اسناد بارگذاری شده"
        isOpen={showRejection}
        toggleModal={() => setShowRejectionModal((val: any) => !val)}
      />

      <RejectModal
        refetch={refetch}
        rejectMutation={rejectMutation}
        title="رد درخواست"
        isOpen={showCancelModal}
        toggleModal={() => setShowCancelModal((val: any) => !val)}
      />

      <SweetAlertCallback
        mutation={confirmMutation}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          confirmMutation.mutate(+req_id, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت انجام شد"], "success");
              history.push("/ManageLicense/IssuingResponsible/MyCartable");
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از تایید این درخواست مطمئنید؟
      </SweetAlertCallback>

      {/* <SweetAlertCallback
        mutation={rejectMutate}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowRejectionModal(false);
        }}
        onClose={() => {
          setShowRejectionModal(false);
        }}
        onConfirm={() => {
          setShowRejectionModal(false);
          rejectMutate.mutate(+req_id, {
            onSuccess: (val: any) => {
              showToast(["با موفقیت انجام شد"], "success");
              history.push("/ManageLicense/IssuingResponsible/MyCartable");
            },
          });
        }}
        show={showRejection}
      >
        آیا از رد این درخواست مطمئنید؟
      </SweetAlertCallback> */}
      <Row style={{ paddingTop: "40px" }}>
        <Col sm="4">
          <SimpleSubmitButton
            isLoading={rejectDocumentsMutation.isLoading}
            btnText="رد مدارک بازگذاری شده"
            onCLick={() => {
              setShowRejectionModal(true);
            }}
          />
        </Col>
      </Row>
      <div
        className="d-flex justify-content-start my-1"
        style={{ paddingTop: "0px" }}
      >
        <SubmitButton
          isLoading={false}
          btnText="تایید"
          onClick={() => setShowCheckModal(true)}
          clearable={true}
          clearableTxt="رد درخواست"
          onClear={() => setShowCancelModal(true)}
        />
      </div>
    </>
  );
};
export { CheckComponent };
