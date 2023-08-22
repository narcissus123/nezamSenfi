import React from "react";

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ResumeHistoryDetails } from "./ResumeHistoryDetails/ResumeHistoryDetails";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data: any;
}

const HistoryDetailsModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  data,
}) => {
  console.log("daaataa----", data);

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
        size="lg"
      >
        <ModalHeader toggle={toggleModal}>تاریخچه رزومه</ModalHeader>
        <ModalBody>
          {data.map((row: any, key: any) => {
            return <ResumeHistoryDetails data={row} />;
          })}
        </ModalBody>
      </Modal>
    </>
  );
};

export { HistoryDetailsModal };
