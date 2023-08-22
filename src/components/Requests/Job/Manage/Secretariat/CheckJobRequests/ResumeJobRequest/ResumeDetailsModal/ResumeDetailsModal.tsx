import React from "react";

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ResumeDetails } from "./ResumeDetails/ResumeDetails";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data: any;
}

const ResumeDetailsModal: React.FC<IPropTypes> = ({
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
          <ResumeDetails data={data} />;
        </ModalBody>
      </Modal>
    </>
  );
};

export { ResumeDetailsModal };
