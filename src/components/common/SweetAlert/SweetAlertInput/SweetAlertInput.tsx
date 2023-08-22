import React, { FC } from "react";

import SweetAlert from "react-bootstrap-sweetalert";

interface IPropTypes {
  title: string;
  show: boolean;
  onConfirm: () => void;
}

const SweetAlertInput: FC<IPropTypes> = ({ title, show, onConfirm }) => {
  return (
    <SweetAlert
      title={title}
      input
      show={show}
      placeholder="Write something"
      onConfirm={() => onConfirm()}
      confirmBtnText="تایید"
    >
      <p className="sweet-alert-text">متن خود را وارد کنید:</p>
    </SweetAlert>
  );
};

export { SweetAlertInput };
