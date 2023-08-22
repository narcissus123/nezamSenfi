import React, { useState } from "react";
import { Button } from "reactstrap";
import { UpManagerCheckJobConfirmModal } from "../UpManagerCheckJobConfirmModal/UpManagerCheckJobConfirmModal";
import { UpManagerCheckJobRejectModal } from "../UpManagerCheckJobRejectModal/UpManagerCheckJobRejectModal";
;
export interface IPropsType {
  isManagerCartable?: boolean;
  type?: string;
  rejectMutation : any;
  confirmMutation : any
}
const CheckComponent: React.FC<IPropsType> = ({
  isManagerCartable = false,
  type,
  rejectMutation,
  confirmMutation,
}) => {
  const [showCheckModal, setShowCheckModal] = useState<any>(false);
  const [showCancelModal, setShowCancelModal] = useState<any>(false);

  return (
    <>
      <UpManagerCheckJobConfirmModal
        confirmMutation={confirmMutation}
        mutation={() => alert("تایید درخواست")}
        isOpen={showCheckModal}
        title="تایید درخواست"
        type={type}
        toggleModal={() => setShowCheckModal((val: any) => !val)}
        isManagerCartable={isManagerCartable}
      />
      <UpManagerCheckJobRejectModal
        rejectMutation={rejectMutation}
        mutation={() => alert("رد درخواست")}
        title="رد درخواست"
        type={type}
        isManagerCartable={isManagerCartable}
        isOpen={showCancelModal}
        toggleModal={() => setShowCancelModal((val: any) => !val)}
      />
      <div className="d-flex justify-content-start my-1">
        <Button
          color="success"
          className={`d-flex align-items-center justify-content-center mr-1`}
          type="submit"
          onClick={() => setShowCheckModal((val: any) => !val)}
        >
          تایید و ادامه
        </Button>
        <Button
          color="danger"
          className={`d-flex align-items-center justify-content-center mr-1`}
          type="submit"
          onClick={() => setShowCancelModal((val: any) => !val)}
        >
          رد درخواست
        </Button>
      </div>
    </>
  );
};
export { CheckComponent };
