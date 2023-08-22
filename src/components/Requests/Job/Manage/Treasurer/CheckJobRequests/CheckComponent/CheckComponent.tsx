import React, { useState } from "react";
import { Button } from "reactstrap";
import { SecretariatCheckJobConfirmModal } from "../CheckJobConfirmModal/SecretariatCheckJobConfirmModal";
import { SecretariatCheckJobRejectModal } from "../CheckJobRejectModal/SecretariatCheckJobRejectModal";
export interface IPropsType {
  type?: string;
}
const CheckComponent: React.FC<IPropsType> = ({ type }) => {
  const [showCheckModal, setShowCheckModal] = useState<any>(false);
  const [showCancelModal, setShowCancelModal] = useState<any>(false);

  return (
    <>
      <SecretariatCheckJobConfirmModal
        mutation={() => alert("تایید درخواست")}
        isOpen={showCheckModal}
        title="تایید درخواست"
        type={type}
        toggleModal={() => setShowCheckModal((val: any) => !val)}
      />
      <SecretariatCheckJobRejectModal
        mutation={() => alert("رد درخواست")}
        title="رد درخواست"
        type={type}
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
