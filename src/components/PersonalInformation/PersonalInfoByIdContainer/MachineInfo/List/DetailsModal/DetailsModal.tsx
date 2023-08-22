import React, { Fragment } from "react";
import { useParams } from "react-router";
import { ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useServeFileByAdmins, useServeShowFileByAdmin } from "../../../../../../core/services/api";
import { DownloadRow } from "../../../../../common/DownloadRow/DownloadRow";
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

  const { id } = useParams<any>();

  let locationOfServices = "";

  if(data.locationOfServices) {
    data.locationOfServices.forEach((row:any) => {
      row === 1
        ? (locationOfServices += "اقامتگاه, ")
        : (locationOfServices += "خارج از اقامتگاه, "); 
    })
  }

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
              نام ماشین: {getValue(data.machineName)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              نوع مالکیت: {getValue(data.typeOfOwnershipTitle)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              نوع استفاده از ماشین: {getValue(data.typeOfMachineUseTitle)}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              شماره شاسی: {getValue(data.chassisNumber)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              شماره سریال / مدل: {getValue(data.serialNumberOrModel)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              پلاک: {getValue(data.plateNumber)}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              شماره موتور: {getValue(data.engineNumber)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              وضعیت بیمه شخص ثالث:
              {data.thirdPartyInsuranceStatus ? "دارد" : "ندارد"}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              تاریخ اعتبار بیمه شخص ثالث:
              {getValue(data.thirdPartyInsuranceValidityDate)}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              نام شرکت بیمه ای شخص ثالث:{" "}
              {getValue(data.thirdPartyInsuranceName)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              وضعیت بیمه بدنه:
              {data.hallInsuranceStatus ? "دارد" : "ندارد"}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              تاریخ بیمه بدنه : {getValue(data.hallInsuranceValidityDate)}
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              نام شرکت بیمه ای بدنه: {getValue(data.hallInsuranceName)}
            </ListGroupItem>
            <ListGroupItem className={Styles["item-flex"]} tag="a">
              محل ارائه خدمات: {locationOfServices}
            </ListGroupItem>
          </ListGroup>

          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem className={Styles["item-flex"]}>
              <div className="d-flex">
                <p>اسناد &nbsp;</p>
              </div>

              {data.files ? (
                <>
                  {data.files.map((row: any, key: any) => {
                    let newRow = { fileName: row.fileName, folderName: +id };
                    return (
                      <>
                        <DownloadRow
                          mutate={useServeFileByAdmins}
                          type="admin"
                          row={newRow}
                          // setIsShow={(val: boolean) => setIsOpen(val)}
                          useServeShowFile={useServeShowFileByAdmin}
                        />
                        <hr />
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export { DetailsModal };
