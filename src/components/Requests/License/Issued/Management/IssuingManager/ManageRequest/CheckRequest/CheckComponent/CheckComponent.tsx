import React, { useState } from "react";
import { SubmitButton } from "../../../../../../../../common/Form";
import { RejectModal } from "../RejectModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

export interface IPropsType {
  acceptMutation: any;
  rejectMutation: any;
  req_id: number;
}
const CheckComponent: React.FC<IPropsType> = ({
  acceptMutation,
  rejectMutation,
  req_id,
}) => {
  const [showCheckModal, setShowCheckModal] = useState<any>(false);
  const [showCancelModal, setShowCancelModal] = useState<any>(false);

  return (
    <>
      {showCheckModal && (
        <ConfirmModal
          acceptMutation={acceptMutation}
          isOpen={showCheckModal}
          title="تایید پروانه"
          toggleModal={() => setShowCheckModal((val: any) => !val)}
          req_id={req_id}
        />
      )}
      {showCancelModal && (
        <RejectModal
          rejectMutation={rejectMutation}
          title="ارجاع به مسئول صدور"
          isOpen={showCancelModal}
          toggleModal={() => setShowCancelModal((val: any) => !val)}
          req_id={req_id}
        />
      )}
      <div className="d-flex justify-content-start my-1">
        <SubmitButton
          isLoading={false}
          btnText="تایید پروانه"
          clearable
          clearableTxt="ارجاع به مسئول صدور"
          onClick={() => setShowCheckModal((val: any) => !val)}
          onClear={() => setShowCancelModal((val: any) => !val)}
        />
      </div>
    </>
  );
};
export { CheckComponent };
