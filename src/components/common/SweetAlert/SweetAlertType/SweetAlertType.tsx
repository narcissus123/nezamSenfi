import React, { FC } from "react";

import { SweetAlerts } from "../../../../core/models";
import SweetAlert from "react-bootstrap-sweetalert";

interface IPropTypes {
  title: string;
  show: boolean;
  onConfirm: () => void;
  children: string;
  type: SweetAlerts;
}

const SweetAlertType: FC<IPropTypes> = ({
  title,
  show,
  onConfirm,
  children,
  type,
}) => {
  const { error, info, success } = SweetAlerts;

  return (
    <SweetAlert
      type={
        type === success
          ? "success"
          : type === error
          ? "error"
          : type === info
          ? "info"
          : "warning"
      }
      title={title}
      show={show}
      onConfirm={() => onConfirm()}
      confirmBtnText="تایید"
    >
      <p className="sweet-alert-text">{children}</p>
    </SweetAlert>
  );
};

export { SweetAlertType };
