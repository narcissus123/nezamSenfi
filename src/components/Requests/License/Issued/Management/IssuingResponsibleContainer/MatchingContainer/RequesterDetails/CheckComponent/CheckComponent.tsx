import React, { useState } from "react";
import { SubmitButton } from "../../../../../../../../common/Form";
import { RejectModal } from "../RejectModal";
import { ConfirmModal } from "../ConfirmModal";

export interface IPropsType {
  acceptMutation: any;
  rejectMutation: any;
  refetch: any;
  rejectStep: boolean;
  acceptStep: boolean;
}
const CheckComponent: React.FC<IPropsType> = ({
  acceptMutation,
  rejectMutation,
  refetch,
  rejectStep,
  acceptStep,
}) => {
  const [showCheckModal, setShowCheckModal] = useState<any>(false);
  const [showCancelModal, setShowCancelModal] = useState<any>(false);

  return (
    <>
      <ConfirmModal
        acceptMutation={acceptMutation}
        isOpen={showCheckModal}
        refetch={refetch}
        title="تایید اطلاعات درخواست کننده"
        toggleModal={() => setShowCheckModal((val: any) => !val)}
      />
      <RejectModal
        refetch={refetch}
        rejectMutation={rejectMutation}
        title="رد تایید اطلاعات درخواست کننده"
        isOpen={showCancelModal}
        toggleModal={() => setShowCancelModal((val: any) => !val)}
      />
      <div className="d-flex justify-content-start my-1">
        <SubmitButton
          isLoading={false}
          btnText="تایید"
          clearable
          clearableDisable={rejectStep}
          isDisabled={acceptStep}
          clearableTxt="رد"
          onClick={() => setShowCheckModal((val: any) => !val)}
          onClear={() => setShowCancelModal((val: any) => !val)}
        />
      </div>
    </>
  );
};
export { CheckComponent };
