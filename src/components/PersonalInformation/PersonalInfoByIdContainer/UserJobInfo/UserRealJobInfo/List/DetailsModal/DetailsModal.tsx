import React, { Fragment } from "react";
import { ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from "reactstrap";
import Styles from './DetailsModal.module.scss';


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  data: any;
}

const DetailsModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  data,
}) => {

  const getValue = (val: any) => {
    return val ? val : "تعیین نشده";
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
        size="lg"
      >
        <ModalHeader toggle={toggleModal}>جزئیات شغل</ModalHeader>
        <ModalBody>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              وضعیت اشتغال: {getValue(data.employmentStatusTitle)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              نوع سازمان محل کار: {getValue(data.workplaceOrganizationTitle)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              مدت سابقه کار: {getValue(data.workExperience)} سال
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              سمت در سازمان: {getValue(data.workPositionTitle)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              گواهی مهارت: {getValue(data.skillCertificateTitle)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              رشته مهارتی: {getValue(data.skillsField)}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              تقدیرنامه:
              {data.appreciation ? "دارای تقدیرنامه" : "فاقد تقدیرنامه"}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              گواهی مهارت از سازمان محل خدمت:{" "}
              {data.skillCertificateFromORG ? "دارای گواهی" : "فاقد گواهی"}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              نوع بیمه: {getValue(data.insuranceTypeTitle)}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <Fragment>
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                وضعیت بیمه تکمیلی:
                {data.perfectedInsurance
                  ? " دارای بیمه تکمیلی"
                  : " فاقد بیمه تکمیلی"}
              </ListGroupItem>

              {data.perfectedInsurance && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  نوع بیمه تکمیلی: {getValue(data.dutySystemState)}
                </ListGroupItem>
              )}

              <ListGroupItem className={Styles["item-flex"]} tag="a">
                سابقه بیمه: {getValue(data.insuranceDuration)} سال
              </ListGroupItem>
            </Fragment>
          </ListGroup>

          {/* <ListGroup className="list-group-horizontal-sm">
        {userData && userData.dutySystemState > 1 && (
          <Fragment>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              شماره کارت پایان خدمت: {getValue(data.dutyEndCartNumber)}
            </ListGroupItem>

            <ListGroupItem className={Styles["item-flex"]} tag="a">
              تاریخ اخذ کارت پایان خدمت: {getValue(data.dutyEndCartDate)}
            </ListGroupItem>
          </Fragment>
        )}
      </ListGroup> */}
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              کد پستی محل کار: {getValue(data.workPostalCode)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              ایمیل کاری: {getValue(data.workEmail)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              شماره تلفن محل کار: {getValue(data.workPhone)}
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              موقعیت: {getValue(data.locationTitle)}
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export { DetailsModal };
