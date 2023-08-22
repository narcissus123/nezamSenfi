import React from "react";

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ContractDetails } from "./ContractDetails/ContractDetails";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data: any;
}

const ContractModal: React.FC<IPropTypes> = ({
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
        <ModalHeader toggle={toggleModal}>جزئیات</ModalHeader>
        <ModalBody>
          <ContractDetails data={data} />;
        </ModalBody>
      </Modal>
    </>
  );
};

export { ContractModal };
