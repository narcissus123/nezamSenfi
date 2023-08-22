import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { useRejectDocumentCancellationByIsuuingResponsible } from "../../../../../../core/services/api/cancelation.api";
import { showToast } from "../../../../../../core/utils";
import { SimpleSubmitButton, SubmitButton } from "../../../../../common/Form";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { RejectModal } from "../RejectModal/RejectModal";


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
        history.push("/ManageLicense/IssuingManager/MyCartable");
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

      <RejectModal
        refetch={refetch}
        rejectMutation={rejectMutation}
        title="رد درخواست"
        isOpen={showCancelModal}
        toggleModal={() => setShowCancelModal((val: any) => !val)}
      />

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
