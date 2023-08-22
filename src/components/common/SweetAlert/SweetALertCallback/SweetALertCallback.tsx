import React, { FC, useEffect, useState } from "react";

import SweetAlert from "react-bootstrap-sweetalert";
import { UseMutationResult } from "react-query";
import { Modal, ModalBody } from "reactstrap";
import { ComponentSpinner } from "../../Spinner/LoadingSpinner";

import Styled from "./SweetALertCallback.module.scss";

interface IPropTypes {
  title: string;
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
  onCancel: () => void;
  mutation: UseMutationResult | any;
  children: string;
}

const SweetAlertCallback: FC<IPropTypes> = ({
  title,
  show,
  onConfirm,
  children,
  onClose,
  onCancel,
  mutation,
}) => {
  const [loadingAlert, setLoadingAlert] = useState<boolean>(false);

  useEffect(() => {
    if (mutation && mutation.isLoading) {
      setLoadingAlert(true);
    }
    if (mutation && mutation.isSuccess) {
      setLoadingAlert(false);
    }
  }, [mutation && mutation.isSuccess, mutation && mutation.isLoading]);

  useEffect(() => {
    if (mutation && mutation.isError) {
      setLoadingAlert(false);
    }
  }, [mutation && mutation.isError]);

  return (
    <React.Fragment>
      <SweetAlert
        title={title}
        warning
        show={show}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="بله"
        cancelBtnText="خیر"
        onConfirm={onConfirm}
        onCancel={() => {
          onCancel();
        }}
      >
        {children}
      </SweetAlert>

      <Modal
        isOpen={loadingAlert}
        className="modal-dialog-centered"
        contentClassName={Styled.modalContent}
      >
        <ModalBody>
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                textAlign: "center",
                paddingTop: "100px",
                fontWeight: "bold",
              }}
            >
              {" "}
              در حال انجام عملیات ...
            </p>
            <ComponentSpinner />
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export { SweetAlertCallback };
