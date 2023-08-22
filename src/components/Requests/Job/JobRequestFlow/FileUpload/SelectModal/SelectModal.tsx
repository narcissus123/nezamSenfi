import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { DropZone } from "../../../../../common/Form/DropZone/DropZone";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data: any;
  accept?: string;
}

const SelectModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  accept,
  data,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>انتخاب اسناد</ModalHeader>
        <ModalBody>
          <DropZone toggleModal={toggleModal} name="files" accept={accept} />
        </ModalBody>
      </Modal>
    </>
  );
};

export { SelectModal };
