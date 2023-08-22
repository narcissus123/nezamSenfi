import React, { FC } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { SimpleSubmitButton } from "../../../../../../common/Form";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { columns } from "./Column";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  tableData: any;
}

const HistoryUsers: FC<IPropTypes> = ({ isOpen, toggleModal, tableData }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose
      size="lg"
      className="modal-dialog-centered"
    >
      <ModalHeader>لیست کاربران</ModalHeader>
      <ModalBody>
        <ListTable
          columns={columns}
          isLoading={false}
          onPageChange={() => {}}
          pageCountList={0}
          tableData={tableData}
        >
          {{ headerTable: <p></p> }}
        </ListTable>
      </ModalBody>

      <ModalFooter className="justify-content-start">
        <SimpleSubmitButton
          isLoading={false}
          btnText="بازگشت"
          color="primary"
          onCLick={toggleModal}
        />
      </ModalFooter>
    </Modal>
  );
};

export { HistoryUsers };
