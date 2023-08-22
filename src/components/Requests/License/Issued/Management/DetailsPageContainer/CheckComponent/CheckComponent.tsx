import React, { useState } from "react";
import { Button } from "reactstrap";
import { SubmitButton } from "../../../../../../common/Form";
import { ExpertCheckLicenseConfirmModal } from "../ExpertCheckLicenseConfirmModal/ExpertCheckLicenseConfirmModal";
import { ExpertCheckLicenseRejectModal } from "../ExpertCheckLicenseRejectModal/ExpertCheckLicenseRejectModal";

export interface IPropsType {
  acceptMutation: any;
  rejectMutation: any;
  refetch: any;
  isSecondCheck?: boolean;
  rejectType?: string;
  isFromAfterVisit? :boolean
}
const CheckComponent: React.FC<IPropsType> = ({
  acceptMutation,
  rejectMutation,
  refetch,
  isSecondCheck = false,
  rejectType,
  isFromAfterVisit,
}) => {
  const [showCheckModal, setShowCheckModal] = useState<any>(false);
  const [showCancelModal, setShowCancelModal] = useState<any>(false);

  return (
    <>
      <ExpertCheckLicenseConfirmModal
        acceptMutation={acceptMutation}
        isOpen={showCheckModal}
        refetch={refetch}
        title="تایید درخواست"
        toggleModal={() => setShowCheckModal((val: any) => !val)}
        isSecondCheck={isSecondCheck}
        isFromAfterVisit={isFromAfterVisit}
      />
      <ExpertCheckLicenseRejectModal
        refetch={refetch}
        rejectMutation={rejectMutation}
        title="رد درخواست"
        isOpen={showCancelModal}
        toggleModal={() => setShowCancelModal((val: any) => !val)}
        isSecondCheck={isSecondCheck}
        rejectType={rejectType}
        isFromAfterVisit={isFromAfterVisit}
      />
      <div className="d-flex justify-content-start my-1">
        <SubmitButton
          isLoading={false}
          btnText="تایید و ادامه"
          clearable
          clearableTxt="رد درخواست"
          onClick={() => setShowCheckModal((val: any) => !val)}
          onClear={() => setShowCancelModal((val: any) => !val)}
        />
      </div>
    </>
  );
};
export { CheckComponent };
