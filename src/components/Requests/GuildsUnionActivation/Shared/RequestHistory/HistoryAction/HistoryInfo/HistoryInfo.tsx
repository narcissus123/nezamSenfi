import React, { FC } from "react";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { SimpleSubmitButton } from "../../../../../../common/Form";

import Styled from "./HistoryInfo.module.scss";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  data: any;
}

const HistoryInfo: FC<IPropTypes> = ({ isOpen, toggleModal, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      className="modal-dialog-centered"
    >
      <ModalHeader>جزییات تاریخچه</ModalHeader>
      <ModalBody>
        <ListGroupItem tag="a" active>
          تاریخچه درخواست
        </ListGroupItem>

        <ListGroup className="list-group-horizontal-sm">
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            نام: {data.name ? data.name : "نامشخص"}
          </ListGroupItem>
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            شناسه ملی: {data.nationalId ? data.nationalId : "نامشخص"}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-horizontal-sm">
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            شماره آگهی ثبتی یا تغییر:{" "}
            {data.officialNewspaperNumber
              ? data.officialNewspaperNumber
              : "نامشخص"}
          </ListGroupItem>
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            تلفن: {data.phone ? data.phone : "نامشخص"}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-horizontal-sm">
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            کد پستی: {data.postalCode ? data.postalCode : "نامشخص"}
          </ListGroupItem>
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            شماره ثبتی:{" "}
            {data.registrationNumber ? data.registrationNumber : "نامشخص"}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-horizontal-sm">
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            وضعیت: {data.statusTitle ? data.statusTitle : "نامشخص"}
          </ListGroupItem>

          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            فکس: {data.fax ? data.fax : "نامشخص"}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-horizontal-sm">
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            ایمیل: {data.email ? data.email : "نامشخص"}
          </ListGroupItem>

          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            کد اقتصادی: {data.economicCode ? data.economicCode : "نامشخص"}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="list-group-horizontal-sm">
          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            آدرس: {data.address ? data.address : "نامشخص"}
          </ListGroupItem>

          <ListGroupItem tag="a" className={Styled["item-flex"]}>
            توضیحات: {data.description ? data.description : "نامشخص"}
          </ListGroupItem>
        </ListGroup>
      </ModalBody>

      <ModalFooter className="justify-content-start">
        <SimpleSubmitButton
          isLoading={false}
          btnText="بازگشت"
          onCLick={toggleModal}
        />
      </ModalFooter>
    </Modal>
  );
};

export { HistoryInfo };
