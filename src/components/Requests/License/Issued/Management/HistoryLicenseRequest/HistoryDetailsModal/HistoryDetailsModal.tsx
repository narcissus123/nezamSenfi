import React from "react";
import { ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from "reactstrap";
import { fullOption } from "../../../../../../../core/utils";
import Styles from './HistoryDetailsModal.module.scss'

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

  const carSupply = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "با کارشناس" },
        { value: 2, label: "با بهره بردار" },
      ],
    },
  ];
  const guildTypeData = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "ثابت" },
        { value: 2, label: "سیار" },
      ],
    },
  ];

  const unionUnitType = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "چند منظوره" },
        { value: 2, label: "مرکب" },
        { value: 3, label: "ساده" },
        { value: 4, label: "کشاورزی عمومی" },
      ],
    },
  ];

  const statusOfUnionUnit = [
    {
      label: "یک گزینه را انتخاب کنید",
      options: [
        { value: 1, label: "دائم" },
        { value: 2, label: "موقت" },
      ],
    },
  ];


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
          <ListGroup tag="div">
            <ListGroup className="list-group-horizontal-sm">
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                {data ? data.jobTitle : ""} : شغل
              </ListGroupItem>
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                نوع کاربری: {data ? data.useTypeTitle : ""}
              </ListGroupItem>
            </ListGroup>
            <ListGroup className="list-group-horizontal-sm">
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                نوع واحد صنفی:{" "}
                {data
                  ? fullOption(data.fixedOrMobieType, guildTypeData).label
                  : ""}
              </ListGroupItem>
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                نوع واحد صنفی کارشناسی شده:{" "}
                {data
                  ? fullOption(data.fixedOrMobieTypeByExpert, guildTypeData)
                      .label
                  : ""}
              </ListGroupItem>
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                موقعیت: {data ? data.cityOrVillageId : ""}
              </ListGroupItem>
            </ListGroup>
            <ListGroup className="list-group-horizontal-sm">
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                وضعیت: {data ? data.statusTitle : ""}
              </ListGroupItem>
              {data && data.countOFAreas > 0 && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  تعداد قطعات: {data.countOFAreas}
                </ListGroupItem>
              )}
            </ListGroup>

            <ListGroup className="list-group-horizontal-sm">
              {data && data.area > 0 && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  مساحت بزرگترین قطعه: {data.area}
                </ListGroupItem>
              )}
              {data && data.allArea > 0 && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  مجموع مساحت قطعات : {data.allArea}
                </ListGroupItem>
              )}
            </ListGroup>

            <ListGroup className="list-group-horizontal-sm">
              {data && data.carSupply > 0 && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  تامین خودرو: {fullOption(data.carSupply, carSupply).label}
                </ListGroupItem>
              )}
              {data && data.allArea > 0 && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  نوع واحد صنفی:{" "}
                  {data
                    ? fullOption(data.guildUnitType, unionUnitType).label
                    : ""}
                </ListGroupItem>
              )}
            </ListGroup>

            <ListGroup className="list-group-horizontal-sm">
              {data && data.carSupply > 0 && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  تاریخ بازدید: {data ? data.visitDate : ""}
                </ListGroupItem>
              )}
              {data && data.allArea > 0 && (
                <ListGroupItem className={Styles["item-flex"]} tag="a">
                  وضعیت واحد صنفی:{" "}
                  {data
                    ? fullOption(data.statusOfGuildUnit, statusOfUnionUnit)
                        .label
                    : ""}
                </ListGroupItem>
              )}
            </ListGroup>
            {data && data.description && (
              <ListGroupItem className={Styles["item-flex"]} tag="a">
                توضیحات : {data ? data.description : ""}
              </ListGroupItem>
            )}
          </ListGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export { HistoryDetailsModal };
