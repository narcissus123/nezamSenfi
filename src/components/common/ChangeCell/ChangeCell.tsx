import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { CallTimer } from "./CallTimer/CallTimer";
import { GetNumber } from "./GetNumber/GetNumber";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
}

const ChangeCell: React.FC<IPropTypes> = ({ isOpen, toggleModal }) => {
  const [nextStep, setNextStep] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const changeNumber = () => {
    setNextStep(true);
  };

  const cancell = () => {
    setNextStep(false);

    toggleModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>تغییر شماره موبایل</ModalHeader>
      {nextStep ? (
        <CallTimer cancell={cancell} phoneNumber={phoneNumber} />
      ) : (
        <GetNumber changeNumber={changeNumber} setPhone={setPhoneNumber} />
      )}
    </Modal>
  );
};

export { ChangeCell };
