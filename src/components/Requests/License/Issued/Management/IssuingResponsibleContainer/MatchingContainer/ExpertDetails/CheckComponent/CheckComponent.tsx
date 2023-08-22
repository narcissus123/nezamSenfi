import React, { useState } from "react";
import { SubmitButton } from "../../../../../../../../common/Form";
import { ExpertizeRejectModal } from "../ExpertizeRejectModal";
import { ExpertizeConfirmModal } from "../ExpertizeConfirmModal";

export interface IPropsType {
  acceptMutation: any;
  rejectMutation: any;
  refetch: any;
  hasIntersect: boolean;
  rejectStep: boolean;
  acceptStep: boolean;
}
const CheckComponent: React.FC<IPropsType> = ({
  acceptMutation,
  rejectMutation,
  refetch,
  hasIntersect,
  rejectStep,
  acceptStep,
}) => {
  const [showCheckModal, setShowCheckModal] = useState<any>(false);
  const [showCancelModal, setShowCancelModal] = useState<any>(false);

  return (
    <>
      {showCheckModal && (
        <ExpertizeConfirmModal
          acceptMutation={acceptMutation}
          isOpen={showCheckModal}
          refetch={refetch}
          title="تایید اطلاعات کارشناس فنی"
          toggleModal={() => setShowCheckModal((val: any) => !val)}
        />
      )}
      {showCancelModal && (
        <ExpertizeRejectModal
          refetch={refetch}
          rejectMutation={rejectMutation}
          title="رد اطلاعات کارشناس فنی"
          isOpen={showCancelModal}
          toggleModal={() => setShowCancelModal((val: any) => !val)}
        />
      )}
      <div className="d-flex justify-content-start my-1">
        <SubmitButton
          isLoading={false}
          btnText="تایید"
          clearable
          clearableDisable={rejectStep}
          isDisabled={hasIntersect || acceptStep}
          clearableTxt="رد"
          onClick={() => setShowCheckModal((val: any) => !val)}
          onClear={() => setShowCancelModal((val: any) => !val)}
        />
      </div>
    </>
  );
};
export { CheckComponent };
